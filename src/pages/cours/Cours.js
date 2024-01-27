import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Card, Button } from 'react-bootstrap';
import { ArchiveFill, PencilSquare, PersonFill, StarFill, TrashFill } from 'react-bootstrap-icons';
import "./cours.scss";
import SideBar from "../../components/SideBar";
import axios from 'axios';

const Cour = () => {

  
  const [searchInput, setSearchInput] = useState('');
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [date, setDate] = useState(null);
  const [newLessons, setNewLessons] = useState([]);

  // Pour recuperer en rendre facilement les donnees
  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = () => {
    axios.get('http://localhost:3002/lessons')
      .then((response) => setNewLessons(response.data))
      .catch((error) => console.error("Error fetching lessons:", error));
  }


  //Pour rechercher 
  useEffect(() => {
    setFilteredLessons(newLessons);
  }, [newLessons]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  
    const filtered = newLessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredLessons(filtered);
  };
  
  // Pour soumettre
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add any necessary logic for form submission
  };


  // Si vous etes admin
  const handleOnly = () => {
  
    const userInput = prompt("Vous devez être admin pour accéder à cette fonctionnalité.");
    if (userInput && userInput.toLowerCase() === "admin") {
      window.location.href = '/addlesson';
    } else {
      alert("Accès refusé. Vous devez être administrateur.");
    }
  };

  
  // Pour supprimer
  const handleDeleteLesson = (lessonId) => {
    const userInput = prompt("Vous devez être admin pour accéder à cette fonctionnalité.");
    if (userInput && userInput.toLowerCase() === "admin") {
      axios.delete(`http://localhost:3002/lessons/${lessonId}`)
      .then((response) => 
        setNewLessons(newLessons.filter(mylesson => mylesson.id !== lessonId)
      ))
      .catch((error) => console.error("Error fetching lessons:", error));
    }

  };
  const handleArchiveLesson = async (lessonId) => {
    try {
      // Fetch the lesson data using lessonId
      const response = await axios.get(`http://localhost:3002/lessons/${lessonId}`);
      const lessonToArchive = response.data;
  
      // Create a new lesson in the archive (you might want to adjust this logic based on your data structure)
      const responseArchive = await axios.post('http://localhost:3002/archived-lessons', lessonToArchive);
  
      // Log the response or handle it as needed
      alert('Lesson archived successfully:', responseArchive.data);
      
  
      // Optionally, update your local state or trigger a refetch of archived lessons
      // fetchArchivedLessons();
  
      // Optionally, delete the lesson from the original list if you want to remove it
      // from the current lessons list after archiving.
      // await axios.delete(`http://localhost:3002/lessons/${lessonId}`);
    } catch (error) {
      console.error('Error archiving lesson:', error.message);
    }
  };
  

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={1} xs={2}>
            <SideBar />
          </Col>
          <Col md={11} xs={10} className='text-center cours'>
            <div>
              {/* Header Section */}
              <div className="myUser">
                {/* Logo Section */}
                <div className="logos-header d-flex align-items-center">
                  <div className="logo-users">
                    <img className='logo-user' src={localStorage.getItem('profilePic')} alt="" />
                  </div>
                  <div className="titre my-2">Bakeli~School of <br /><span>Technologie</span></div>
                </div>
                {/* Information Section */}
                <div className="me-5">
                  <h4 className='text-light animate__animated animate__fadeInDownBig'>Apprendre + Discipline = Reussite</h4>
                </div>
                {/* User Section */}
                <div className="users d-flex align-items-center">
                  <div className="name-user me-2">
                    <h5 className='d-flex align-items-center gap-1'><PersonFill/> {localStorage.getItem('name')}</h5>
                  </div>
                </div>
              </div>

              {/* Course Header Section */}
              <div className="header-cours">
                <div className="title-cours m-auto my-4 text-white">
                  <h2>Les Cours</h2>
                </div>
                {/* Search Form */}
                <form onSubmit={handleSubmit} className='form d-flex'>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleInputChange}
                    placeholder="Qu'est-ce que tu veux apprendre ?"
                    className='form-control'
                  />
                  <button type="submit" name='search' id='search' className='btn btn-primary ms-1'>Search</button>
                </form>
              </div>
              <div className="text-start my-3">
                <Link onClick={handleOnly} className='btn btn-success'>Ajouter</Link>
              </div>
              <div className="myRow d-md-flex">
                <div className="cours-list">
                  {filteredLessons.map((mylesson) => (
                    <Col md={7} xs={12} key={mylesson.id}>
                      <Link to={`/lesson/${mylesson.id}`} className='a'>
                        <div className={`cour-bg b-${mylesson.id}`} style={{ background: `#${mylesson.id.toString(16)}`, 
                          borderRadius: "20px"}}>
                          <div className="info-left my-3">
                            <div className="myImg">
                                <img 
                                className='myImg'
                                src={mylesson.image} 
                                alt="img" 
                                style={{ width: '150px', height: '80px', position: 'relative', left: '10px', top: '5px' }}
                                />
                            </div>
                              <div className="text">
                                <span className='titre fw-bold'>{mylesson.title}</span><br />
                                <span className='date'>{mylesson.date}</span><br />
                                <span className='n-lesson'>{mylesson.lessonsCount} leçons</span>
                              </div>
                            <div className="text-end">
                                <div className='text-end-child'>
                                  <span className='fs-1 text-end'>
                                    <p className='point'>.</p>
                                    </span> ({mylesson.duration}) 
                                    <p className='p'>tous les jours</p>
                                </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                          <div className="text-end theBtn">
                            <div className="buttons-container">
                              <Link onClick={() => handleDeleteLesson(mylesson.id)}>
                                <TrashFill size={20} color='red' />
                              </Link>
                              <Link onClick={() => handleArchiveLesson(mylesson.id)}>
                                <ArchiveFill size={20} color='orange' />
                              </Link>
                              <Link to={`/editlesson/${mylesson.id}`} >
                                <PencilSquare size={20} color='yellow' />
                              </Link>
                            </div>
                          </div>
                    </Col>
                  ))}
                </div>

                {/* Teacher Section */}
                <div className="teacher ms-3">
                  <h3 className='text-center'>Calendrier</h3>
                  <div className="card flex justify-content-center">
                    <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek={false} />
                  </div>
                  <hr />
                  {/* Admin Section */}
                  <div className="admin">
                    <Card className="text-center">
                      <Card.Header>Administrateur</Card.Header>
                      <Card.Body>
                        <Card.Title className='d-flex align-items-center'>
                          <div className="admin-photo"></div>
                          <div className="text ms-3">John Week <br />
                            <span className='me-5 text-warning'>
                              <StarFill size={12} /><StarFill size={12} /><StarFill size={12} /><StarFill size={12} />
                            </span>
                          </div>
                        </Card.Title>
                        <Card.Text>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body>
                      <Card.Footer className="text-muted">2 years ago</Card.Footer>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Coaches Section */}
              <h5 className=' my-2 text-start fw-bold'>Coachs</h5>
              <div className="coachs">
                {/* Coach Sections (Add as needed) */}
                {[...Array(7).keys()].map((index) => (
                  <div key={index} className="coach my-3 d-flex">
                    <input
                      type="radio"
                      id={`toggleCoachInfo_${index}`}
                      name="coachGroup"
                      className="coach-photo-radio"
                      checked={true}
                    />
                    <label htmlFor={`toggleCoachInfo_${index}`} className="coach-photo"></label>
                    <div className="coach-info fw-bold">Je suis Eric <br />Programmeur <br /> 25 ans </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cour;
