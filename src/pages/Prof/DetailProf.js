import React, { useState, useEffect } from 'react';
import { PersonBoundingBox } from 'react-bootstrap-icons';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [prof, setProf] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3002/professors/${id}`);
        if (!response.ok) {
          throw new Error("Unexpected Server Response");
        }

        const data = await response.json();
        setProf(data);
        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!prof) {
    return <p>Loading...</p>;
  }

  return (
    <div className='border shadow m-auto w-50 my-5'>
      <h2 className='text-center shadow'>Professeur: <span className='fw-light'>{prof.firstName} {prof.name}</span></h2>
      <div className="p-5 d-flex justify-content-between">
        <div className="info">
          <p><span className='fw-bold ms-3'>ID </span>: {prof.id}</p>
          <p><span className='fw-bold ms-3'>Prénom</span>: {prof.firstName}</p>
          <p><span className='fw-bold ms-3'>Nom</span>: {prof.name}</p>
          <p><span className='fw-bold ms-3'>Email</span>: {prof.email}</p>
          <p><span className='fw-bold ms-3'>Matière</span>: {prof.filiere}</p>
          <p><span className='fw-bold ms-3'>Tél</span>: {prof.tel}</p>
          <Link to="/cour" className='btn btn-primary ms-3'>Back</Link>
          <Link to={`/modifier/${prof.id}`} className='btn btn-warning ms-3'>Modifier</Link>
        </div>
        <div className="user d-flex justify-content-center me-5 my-5">
            <a href='/404'><PersonBoundingBox color='grey' size={100}/></a>
        </div>
      </div>
    </div>
  );
};

export default Detail;
