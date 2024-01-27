import React, { useState, useEffect } from 'react';
import "./student.scss";
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash2Fill } from 'react-bootstrap-icons';

const Student = () => {
    const [students, setstudents] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchstudents();
    }, []);

    const fetchstudents = () => {
        axios.get('http://localhost:3002/students')
            .then((response) => setstudents(response.data))
            .catch((error) => console.error("Error fetching students:", error));
    }

    const handleDelete = (profId) => {
        axios.delete(`http://localhost:3002/students/${profId}`)
            .then(response => {
                setstudents(students.filter(prof => prof.id !== profId))
            })
            .catch((error) => console.error("Error deleting professor:", error));
    }

    const filteredStudents = students.filter((prof) =>
        prof.name && prof.firstName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleFilter = (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={12} className='text-center fs-3'>
                        <h3 className='shadow text-dark fw-bold'>Listes des Apprenants</h3>
                        <div className="header-table d-flex align-items-center justify-content-between">
                            <div className="search">
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Search by name...'
                                    value={searchInput}
                                    onChange={handleFilter}
                                />
                            </div>
                            <div className="text-end-student text-end my-2">
                                <Link to="/cour" className='btn btn-primary me-2'>retour</Link>
                                <Link to="/addstudent" className='btn btn-success'>Ajouter</Link>
                            </div>
                        </div>
                        <div className="listes">
                            <table className='myTable table shadow'>
                                <thead className='thead'>
                                    <tr className='tr'>
                                        <th>ID</th>
                                        <th>Prenom</th>
                                        <th>Nom</th>
                                        <th>Cours</th>
                                        <th>Email</th>
                                        <th>Telephone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((students, index) => (
                                        <tr key={index}>
                                            <td className='fw-bold'>{students.id}</td>
                                            <td>{students.firstName}</td>
                                            <td>{students.name}</td>
                                            <td>{students.cours}</td>
                                            <td>{students.email}</td>
                                            <td>{students.tel}</td>
                                            <td>
                                                <Link to={`/edit/${students.id}`} className='btn btn-warning'>Modifier</Link>
                                                <Link to={`/view/${students.id}`} className='btn btn-success ms-3'>Voir</Link>
                                                <button className='btn btn-danger ms-3' onClick={() => handleDelete(students.id)}>
                                                    <Trash2Fill />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Student;
