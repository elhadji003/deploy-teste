import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftCircleFill, TrashFill } from 'react-bootstrap-icons';
import "./archiver.scss"

const Archiver = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // Fetch lessons from your server when the component mounts
    fetchLessons();
  }, []);


  const fetchLessons = async () => {
    try {
      const response = await axios.get('http://localhost:3002/lessons');
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error.message);
    }
  };


  const handleDeleteLesson = (lessonId) => {
    axios.delete(`http://localhost:3002/archived-lessons/${lessonId}`)
      .then((response) => 
        setLessons(lessons.filter(lesson => lesson.id !== lessonId)
      ))
      .catch((error) => console.error("Error fetching lessons:", error));
  }

  


  return (
    <div>
      <Container>
      <Link to="/cour" className="btn btn-light me-5"><ArrowLeftCircleFill/></Link>
        <h1 className='shadow border-bottom text-center'>leçons archivées</h1>
        <Row>
        {lessons.map((mylesson) => (
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
                          <div className="archive text-end theBtn">
                            <div className="buttons-container">
                              <Link onClick={() => handleDeleteLesson(mylesson.id)}>
                                <TrashFill size={20} color='red' />
                              </Link>
                            </div>
                          </div>
                    </Col>
                  ))}
        </Row>
      </Container>
    </div>
  );
}
export default Archiver;
