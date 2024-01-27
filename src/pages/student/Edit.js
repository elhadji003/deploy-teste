import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';

const Edit = () => {
    const [values, setValues] = useState({
        firstName: "",
        name: "",
        email: "",
        tel: "",
    });

    const { id } = useParams
    const navigate = useHistory();

    useEffect(() => {
        // Fetch professor data by ID and populate the form
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/students/${id}`);
                const studentData = response.data;

                // Populate the form fields with professor data
                setValues({
                    firstName: studentData.firstName,
                    name: studentData.name,
                    email: studentData.email,
                    tel: studentData.tel,
                });
            } catch (error) {
                console.error("Error fetching professor data:", error);
            }
        };

        fetchStudentData();
    }, [id]);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const updatStudent = async () => {
        try {
            // Send the updated professor data to the server
            await axios.put(`http://localhost:3002/students/${id}`, {
                firstName: values.firstName,
                name: values.name,
                email: values.email,
                tel: values.tel,
                // Add other necessary data
            })

            // Handle success
            alert(`Vous avez modifier l'apprenant ${values.firstName}`);

            // Navigate to the '/profs' route
            navigate('/student');
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col md={6} className='text-center m-auto my-5 fw-bold bg-light border shadow'>
                        <h5 className='my-3 shadow p-2 bg-light'>Modifier un apprenant</h5>
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
                            <button className='btn btn-success border shadow' onClick={updatStudent}>Modifier</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Edit;
