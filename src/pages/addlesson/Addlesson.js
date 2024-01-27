import React, { useState } from 'react';
import "./addlesson.scss";
import axios from 'axios';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';

const Addlesson = () => {
  const [values, setValues] = useState({
    title: '',
    date: '',
    lessonsCount: '',
    duration: '',
    image: null
  });

  const [imageUrl, setImageUrl] = useState('');
  const navigate = useHistory();


  const handleChange = (e) => {
    
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;

    setValues({
      ...values,
      [name]: newValue,
    });
  };

  const handleAjoute = async (e) => {
    e.preventDefault();

    const { title, date, lessonsCount, duration } = values;

    // Validate input fields
    if (!title || !date || !lessonsCount || !duration) {
      console.error('Please fill in all fields');
      return;
    }

    try {

      // Upload de l'image vers Firebase Storage
      const storageRef = ref(storage, `images/${values.image.name}`);
      await uploadBytes(storageRef, values.image);

      // Récupération de l'URL d'image
      const imageUrl = await getDownloadURL(storageRef);

      // Enregistrement de l'URL d'image dans le state
      setImageUrl(imageUrl);

      // Afficher une alerte
      alert('L\'image a été récupérée avec succès!');

      // Envoi des données de l'utilisateur (y compris l'URL d'image) vers le serveur
      // Make the POST request
      const response = await axios.post('http://localhost:3002/lessons', {
        title: title,
        date: date,
        lessonsCount: lessonsCount,
        duration: duration,
        image: imageUrl
      });

      navigate('/cour')

      // Handle successful response
      console.log('Lesson added successfully:', response.data);

      // Reset the form values
      setValues({
        title: '',
        date: '',
        lessonsCount: '',
        duration: '',
        image: null
      });
      setImageUrl('')

      // Optionally, provide user feedback (e.g., show a success message)
    } catch (error) {
      // Handle error
      console.error('Error adding lesson:', error.message);

      // Optionally, provide user feedback (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2 className='text-center shadow border-3'>Ajouter une leçon</h2>
      <form className='my-5 form-lesson' onSubmit={handleAjoute}>
        <div className="input-1 d-flex gap-3 justify-content-center p-2">
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className='form-control w-md-25 shadow'
            placeholder="Title"
          />
          <input
            type="text"
            name="date"
            value={values.date}
            onChange={handleChange}
            className='form-control w-md-25 shadow'
            placeholder="Date"
          />
        </div>
        <div className="input-1 d-flex gap-3 justify-content-center p-2">
          <input
            type="text"
            name="lessonsCount"
            value={values.lessonsCount}
            onChange={handleChange}
            className='form-control w-md-25 shadow'
            placeholder="Lessons Count"
          />
          <input
            type="text"
            name="duration"
            value={values.duration}
            onChange={handleChange}
            className='form-control w-md-25 shadow'
            placeholder="Duration"
          />
        
         

        {imageUrl && <img src={imageUrl} alt="Utilisateur" />}


        </div>
        <div className="input-file d-flex justify-content-center">
            <input
                className='form-control shadow w-md-50'
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
            />
        </div>
        <div className="submit-lesson my-2">
          <Link to="/cour" type="button" className="ms-1 btn btn-primary">Retour</Link>
          <button type="submit" className="btn btn-success ms-2">Ajouter</button>
        </div>
      </form>
    </div>
  );
};

export default Addlesson;
