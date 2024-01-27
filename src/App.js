import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import Cours from './pages/cours/Cours';
import Dashbord from './pages/dashboard/Dashbord';
import Profs from './pages/Prof/Profs';
import SignUp from './pages/setting/SignUp';
import Login from './pages/setting/Login';
import Addlesson from './pages/addlesson/Addlesson';
import Archiver from './pages/archiver/Archiver';
import AddProfs from './pages/Prof/AddProfs';
import Modifier from './pages/Prof/Modifier';
import EditLesson from './pages/addlesson/EditLesson';
import DetailProf from './pages/Prof/DetailProf';
import Student from './pages/student/Student';
import AddStudent from './pages/student/AddStudent';
import Edit from './pages/student/Edit';
import ViewStudent from './pages/student/ViewStudent';

function App() {
  return (
    <div className="App">
      <Router>
            <Switch>
                <Route exact path="/">
                  <Login />
                </Route>
                <Route path="/sign">
                  <SignUp />
                </Route>
                <Route path="/cour">
                  <Cours />
                </Route>
                <Route path="/profs">
                  <Profs />
                </Route>
                <Route path="/addprof">
                  <AddProfs />
                </Route>
                <Route path="/addlesson">
                  <Addlesson />
                </Route>
                <Route path="/editlesson/:id">
                  <EditLesson />
                </Route>
                <Route path="/dashboard">
                  <Dashbord />
                </Route>
                <Route path="/archive/:id">
                  <Archiver />
                </Route>
                <Route path="/modifier/:id">
                  <Modifier />
                </Route>
                <Route path="/viewprof/:id">
                  <DetailProf />
                </Route>
                <Route path="/student/:id">
                  <Student />
                </Route>
                <Route path="/addstudent">
                  <AddStudent />
                </Route>
                <Route path="/edit/:id">
                  <Edit />
                </Route>
                <Route path="/view/:id">
                  <ViewStudent />
                </Route>
              </Switch>
      </Router>
    </div>
  );
}

export default App;
