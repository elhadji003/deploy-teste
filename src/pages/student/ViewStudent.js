import React, { useState, useEffect } from 'react';
import { PersonBoundingBox } from 'react-bootstrap-icons';
import { Link, useParams } from 'react-router-dom';

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3002/students/${id}`);
        if (!response.ok) {
          throw new Error("Unexpected Server Response");
        }

        const data = await response.json();
        setStudent(data);
        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className='border shadow m-auto w-50 my-5'>
      <h2 className='text-center shadow'>Apprenant: <span className='fw-light'>{student.firstName} {student.name}</span></h2>
      <div className="p-5 d-flex justify-content-between">
        <div className="info">
          <p><span className='fw-bold ms-3'>ID </span>: {student.id}</p>
          <p><span className='fw-bold ms-3'>Prénom</span>: {student.firstName}</p>
          <p><span className='fw-bold ms-3'>Nom</span>: {student.name}</p>
          <p><span className='fw-bold ms-3'>Email</span>: {student.email}</p>
          <p><span className='fw-bold ms-3'>cours</span>: {student.cours}</p>
          <p><span className='fw-bold ms-3'>Tél</span>: {student.tel}</p>
          <Link to="/cour" className='btn btn-primary ms-3'>Back</Link>
          <Link to={`/modifier/${student.id}`} className='btn btn-warning ms-3'>Modifier</Link>
        </div>
        <div className="user d-flex justify-content-center me-5 my-5">
            <a href='/404'><PersonBoundingBox color='grey' size={100}/></a>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
