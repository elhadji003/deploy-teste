import React, { useEffect, useState } from 'react';
import "./addlesson.scss";
import axios from 'axios';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';

const EditLesson = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/lessons/${id}`);
        if (!response.data) {
          throw new Error('Unexpected server Response');
        }

        const data = response.data;
        setValues({
          title: data.title,
          date: data.date,
          lessonsCount: data.lessonsCount,
          duration: data.duration,
          image: data.image
        });
        setImageUrl(data.image);
      } catch (error) {
        console.error('Error fetching lesson:', error.message);
      }
    };

    fetchLesson();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const { title, date, lessonsCount, duration, image } = values;

    // Validate input fields
    if (!title || !date || !lessonsCount || !duration) {
      console.error('Please fill in all fields');
      return;
    }

    try {
      // If a new image is selected, upload it to Firebase Storage
      if (image instanceof File) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const newImageUrl = await getDownloadURL(storageRef);
        setImageUrl(newImageUrl);
      }

      // Update the lesson data on the server
        await axios.put(`http://localhost:3002/lessons/${id}`, {
        title,
        date,
        lessonsCount,
        duration,
        image: imageUrl, // Use the existing or newly uploaded image URL
      });

      // Handle successful response
      alert('leçon modifier')
      // Reset the form values
      setValues({
        title: '',
        date: '',
        lessonsCount: '',
        duration: '',
        image: null
      });
      setImageUrl('');

      // Optionally, provide user feedback (e.g., show a success message)
      navigate('/cour');
    } catch (error) {
      // Handle error
      console.error('Error editing lesson:', error.message);

      // Optionally, provide user feedback (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2 className='text-center shadow border-3'>Modifier une leçon</h2>
      <form className='my-5' onSubmit={handleEdit}>
        <div className="input-1 d-flex gap-3 justify-content-center p-2">
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className='form-control w-25 shadow'
            placeholder="Title"
          />
          <input
            type="text"
            name="date"
            value={values.date}
            onChange={handleChange}
            className='form-control w-25 shadow'
            placeholder="Date"
          />
        </div>
        <div className="input-1 d-flex gap-3 justify-content-center p-2">
          <input
            type="text"
            name="lessonsCount"
            value={values.lessonsCount}
            onChange={handleChange}
            className='form-control w-25 shadow'
            placeholder="Lessons Count"
          />
          <input
            type="text"
            name="duration"
            value={values.duration}
            onChange={handleChange}
            className='form-control w-25 shadow'
            placeholder="Duration"
          />
        </div>
        {/* {imageUrl && <img src={imageUrl} alt="Utilisateur" />} */}
        <div className="input-file d-flex justify-content-center">
          <input
            className='form-control shadow w-50'
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="submit text-center my-1">
          <Link to="/cour" type="button" className="btn btn-primary">Retour</Link>
          <button type="submit" className="btn btn-success ms-2">Modifier</button>
        </div>
      </form>
    </div>
  );
};

export default EditLesson;
