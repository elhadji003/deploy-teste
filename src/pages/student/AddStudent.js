import React, { useState } from 'react';
import "./student.scss";
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';



const AddStudent = () => {
    const [values, setValues] = useState({
        firstName: "",
        name: "",
        cours: "",  // Ajout de la filière dans l'état
        email: "",
        tel: "",
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const navigate = useHistory;

    const onSubmit = async () => {
        // Extract relevant data from the state

        const { firstName, name, cours, email, tel } = values;

        try {
            // Send the new professor data to the server
            const response = await axios.post('http://localhost:3002/students', {
                firstName: firstName,
                name: name,
                cours: cours ,  // Inclure la filière dans les données envoyées
                email: email,
                tel: tel,
            });

            // Handle success
            alert("Student added successfully:", response.data);

            // Navigate to the '/profs' route
            navigate('/student/:id');

            // Clear the form fields after submission
            setValues({
                firstName: "",
                name: "",
                email: "",
                cours: "",  
                tel: "",
            });
        } catch (error) {
            console.error("Error adding professor:", error);
        }
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col md={6} className='text-center m-auto my-5 fw-bold bg-light border shadow'>
                        <h5 className='my-3'>Ajouter un apprenant</h5>
                        <div className="form my-4">
                            <div className='d-flex gap-4'>
                                <input
                                    type="text"
                                    name='firstName'
                                    placeholder='Prénom'
                                    className='form-control border shadow'
                                    value={values.firstName}
                                    onChange={onChange}
                                />
                                <input
                                    type="text"
                                    name='name'
                                    placeholder='Nom'
                                    className='form-control border shadow'
                                    value={values.name}
                                    onChange={onChange}
                                />
                            </div> <br />

                            <div className='d-flex gap-4'>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder='E-mail'
                                    className='form-control border shadow'
                                    value={values.email}
                                    onChange={onChange}
                                />
                                <input
                                    type="tel"
                                    name='tel'
                                    placeholder='Téléphone'
                                    className='form-control border shadow'
                                    value={values.tel}
                                    onChange={onChange}
                                /> 
                            </div> <br />

                                <select name="cours" className='form-control border shadow' value={values.cours} onChange={onChange}>
                                    <option className='text-secondary'>Choisissez ta cours à apprendre</option>
                                    <option value="Markting">Marketing</option>
                                    <option value="Design">Design</option>
                                    <option value="Programmation">Programmation</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                </select>

                                <br />
                            
                            <div className="btn-student text-md-end">
                                <Link to="/student/:id" className='btn btn-primary me-2'>retour</Link>
                                <button className='btn btn-success my-4 border shadow' onClick={onSubmit}>Ajouter</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddStudent;

