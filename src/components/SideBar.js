import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import './sidebar.scss';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  
  const onClickSignOut = () => {
    // Afficher l'alerte de confirmation
    const confirmLogout = window.confirm('Voulez-vous vous déconnecter ?');
  
    // Si l'utilisateur confirme, effectuer la navigation et fermer la fenêtre
    if (confirmLogout) {
      // Naviguer vers la page de déconnexion (remplacez '/logout' par votre URL de déconnexion)
      window.location.replace('/');
      
      // Fermer la fenêtre (cette ligne peut ne pas fonctionner sur tous les navigateurs)
      window.close();
    }
  };
  
  

  return (
    <CDBSidebar textColor="#fff" backgroundColor="#333" className="sidebar">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/" className="text-decoration-none">
          Bakeli~School
        </a>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink exact to="/cour">
            <CDBSidebarMenuItem className="fs-5 me-4" icon="home">
              Acceuil
            </CDBSidebarMenuItem>
          </NavLink>
          <hr />
          <NavLink exact to="/profs">
            <CDBSidebarMenuItem className="fs-5 me-4" icon="user-friends">
              Professeurs
            </CDBSidebarMenuItem>
          </NavLink>
          <hr />
          <NavLink exact to="/student/id">
            <CDBSidebarMenuItem className="fs-5 me-4" icon="book-open">
              Apprenants
            </CDBSidebarMenuItem>
          </NavLink>
          <hr />
          <NavLink exact to="/dashboard">
            <CDBSidebarMenuItem className="fs-5 me-4" icon="calendar-alt">
              Analytics
            </CDBSidebarMenuItem>
          </NavLink>
          <hr />
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter>
        <NavLink exact to={`/archive/:id`}>
          <CDBSidebarMenuItem className="fs-5 me-4 text-white" icon="archive"></CDBSidebarMenuItem>
        </NavLink>
        <button onClick={onClickSignOut}>
          <CDBSidebarMenuItem className="fs-5 me-4 text-white" icon="sign-out-alt"></CDBSidebarMenuItem>
        </button>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default SideBar;
