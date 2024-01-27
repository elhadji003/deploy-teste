import React, { useState } from 'react';
import './sign.scss';
import { Container, Button, Col, Row } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';


const SignUp = () => {
    
  const [values, setValues] = useState({
    name: '',
    firstName: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const navigate = useHistory('/cour')
  const handleSumbit = (e) => {
    e.preventDefault();

    if (
      values.name === '' ||
      values.firstName === '' ||
      values.number === '' ||
      values.email === '' ||
      values.password === '' ||
      values.confirmPassword === ''
    ) {
      alert('Vous devez remplir tous les champs');
      return;
    } else if (values.password !== values.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');

      // Réinitialiser seulement les champs password et confirmPassword
      setValues((prevValues) => ({
        ...prevValues,
        password: '',
        confirmPassword: '',
      }));
      return;
    } else if (values.password === values.confirmPassword) {
      // Create user with email and password
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User created:', user);
          alert('Votre compte a été créé avec succès!');
        })
        .catch((error) => {
          console.error('Error creating user:', error);
          alert('Une erreur s\'est produite lors de la création de l\'utilisateur.');
        });

        navigate('/cour')
    }

    // Clear the form fields
    setValues({
      name: '',
      firstName: '',
      email: '',
      number: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      <Container>
        <h4 className='text-center my-3 bg-dark p-1 text-white shadow border-bottom '>
          Bienvenue dans Bakeli~School
        </h4>
        <Row>
          <form action='' className='form-sign' onSubmit={handleSumbit}>
            <h5>Je m'inscris</h5>
            <div className='first d-flex justify-content-center gap-4'>
              <Col md={5}>
                <div className='input my-3'>
                  <input
                    value={values.name}
                    type='text'
                    className='form-control'
                    id='input1'
                    name='name'
                    placeholder='Nom'
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col md={5}>
                <div className='input my-3'>
                  <input
                    value={values.firstName}
                    type='text'
                    className='form-control'
                    id='input2'
                    name='firstName'
                    placeholder='Prenom'
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </div>
            <div className='first d-flex justify-content-center gap-4'>
              <Col md={5}>
                <div className='input my-3'>
                  <input
                    value={values.number}
                    type='number'
                    className='form-control'
                    id='input3'
                    name='number'
                    placeholder='Numero'
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col md={5}>
                <div className='input my-3'>
                  <input
                    value={values.email}
                    type='email'
                    className='form-control'
                    id='input4'
                    name='email'
                    placeholder='E-mail'
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </div>
            <div className='first d-flex justify-content-center gap-4'>
              <Col md={5}>
                <div className='input my-3'>
                  <input
                    value={values.password}
                    type='password'
                    className='form-control'
                    id='input5'
                    name='password'
                    placeholder='Mot de passe'
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col md={5}>
                <div className='input my-3'>
                  <input
                    value={values.confirmPassword}
                    type='password'
                    className='form-control'
                    id='input6'
                    name='confirmPassword'
                    placeholder='Confirme le mot de passe'
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </div>
            <div className='text-center'>
              <Button
                variant='secondary'
                className='form-control w-50 my-3'
                type='submit'
              >
                Submit
              </Button>

              <div className='login my-3'>
                <Link to='/'>j'ai un compte !</Link>
              </div>
            </div>
          </form>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
