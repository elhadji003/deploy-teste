import React, { useState, useEffect } from 'react';
import "./prof.scss";
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { EyeFill, PencilSquare, Trash2Fill } from 'react-bootstrap-icons';
import SideBar from '../../components/SideBar';

const Profs = () => {
    const [professors, setProfessors] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchProfessors();
    }, []);

    const fetchProfessors = () => {
        axios.get('http://localhost:3002/professors')
            .then((response) => setProfessors(response.data))
            .catch((error) => console.error("Error fetching professors:", error));
    }

    const handleDelete = (profId) => {
        axios.delete(`http://localhost:3002/professors/${profId}`)
            .then(response => {
                setProfessors(professors.filter(prof => prof.id !== profId))
            })
            .catch((error) => console.error("Error deleting professor:", error));
    }

    const filteredProfessors = professors.filter((prof) =>
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
                    <Col md={1}>
                        <SideBar/>
                    </Col>
                    <Col md={11} className='text-center fs-3'>
                        <h3 className='shadow text-dark fw-bold'>Listes des Professeurs</h3>
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
                            <div className="prof text-end my-2">
                                <Link to="/cour" className="btn btn-primary me-1">retour</Link>
                                <Link to="/addprof" className='btn btn-success'>Ajouter</Link>
                            </div>
                        </div>
                        <div className="listes">
                            <table className='myTable table shadow'>
                                <thead className='thead'>
                                    <tr className='tr'>
                                        <th>ID</th>
                                        <th>Prenom</th>
                                        <th>Nom</th>
                                        <th>Filiere</th>
                                        <th>Email</th>
                                        <th>Telephone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProfessors.map((prof, index) => (
                                        <tr key={index}>
                                            <td className='fw-bold'>{prof.id}</td>
                                            <td>{prof.firstName}</td>
                                            <td>{prof.name}</td>
                                            <td>{prof.filiere}</td>
                                            <td>{prof.email}</td>
                                            <td>{prof.tel}</td>
                                            <td className='d-flex justify-content-center'>
                                                <Link to={`/modifier/${prof.id}`} className='btn btn-warning'><PencilSquare/></Link>
                                                <Link to={`/viewprof/${prof.id}`} className='btn btn-success ms-3'><EyeFill/></Link>
                                                <button className='btn btn-danger ms-3' onClick={() => handleDelete(prof.id)}>
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

export default Profs;
