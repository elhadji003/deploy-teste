import { useState, useEffect } from 'react';
import './login.scss';
import { Container, Button, Col, Row } from 'react-bootstrap';
import { signInFacebook, signInGoogle, auth } from '../../firebase'; // Import auth from Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Facebook, Google } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [errorMessage, setErrorMessage] = useState(false);
  // const navigate = useHistory();

  // Check the authentication state on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        alert('Vous avez déjà un compte');
        alert('Vous êtes connecté');
        window.location.href = '/cour';
        // Vous pouvez également naviguer automatiquement ici si nécessaire
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      console.log(user);

      // Si l'authentification est réussie, vous pouvez choisir de naviguer ici ou laisser la décision à l'utilisateur
      // navigate('/cour');
    } catch (error) {
      console.log(error);

      // Handle authentication errors
      if (error.code === 'auth/invalid-email') {
        // Handle case where user with the provided email does not exist
        setErrorMessage(<div className="alert alert-danger">Ce compte n'existe pas.</div>);
      } else {
        // Handle other authentication errors
        setErrorMessage(<div className="alert alert-danger">{error.message}</div>);
      }
    }

    if (values.email === '' || values.password === '') {
      setErrorMessage(<div className="alert alert-danger">Veuillez remplir les champs !</div>);
      return;
    }
    setErrorMessage('');

    setValues({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <Container>
        <h4 className="text-center bg-dark p-1 text-white shadow border-bottom">
          Bienvenue dans Bakeli~School
        </h4>
        <Row className="myRow1">
          <h3 className="text-center shadow bg-login">Login</h3>
          <p className="errorM text-danger text-center">{errorMessage}</p>
          <form action="" className="form-login" onSubmit={handleSubmit}>
            <div className="first d-flex justify-content-center gap-4">
              <Col md={5}>
                <div className="input my-3">
                  <label htmlFor="email">E-mail ou telephone</label>
                  <input
                    value={values.email}
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="E-mail ou telephone"
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </div>
            <div className="first d-flex justify-content-center gap-4">
              <Col md={5}>
                <div className="input my-3">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    value={values.password}
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </div>
            <div className="text-center">
              <Button
                variant="secondary"
                className="form-control w-25 my-3"
                type="submit"
              >
                Connecter
              </Button>
              <div className="login my-2">
                <Link to="/sign">J'ai encore pas de compte ?</Link>
              </div>
            </div>
          </form>
          <div className="first d-flex justify-content-center gap-4">
            <Col md={5}>
              <div className="facebook">
                <button onClick={signInFacebook} className="btn btn-primary w-100 my-1">
                  <span className="me-3">connecter avec </span>
                  <Facebook size={40} color="blue" />
                </button>
              </div>
            </Col>
            <Col md={5}>
              <div className="google">
                <button onClick={signInGoogle} className="btn btn-warning w-100 my-1">
                  <span className="me-3">connecter avec </span>
                  <Google size={40} color="yellow" />
                </button>
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
