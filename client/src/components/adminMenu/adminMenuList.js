import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { getToken, logout } from '../../services/auth';
import api from '../../services/api';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component="a" href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
   <ListItemButton component="a" href="/admin/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
    </ListItemButton> 
    <ListItemButton component="a" href="/admin/courses">
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Cursos" />
    </ListItemButton>  
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>Configurações</ListSubheader>
    <ListItemButton onClick={confirmSair}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
); 

async function confirmSair(){
  if(window.confirm("Deseja realmente sair?")){
    const response = await api.get("/api/users/destroytoken", {headers:{token: getToken()}});
    if(response.status===200){
      logout();
      window.location.href = '/login'
    }else{
      alert("Não foi possível fazer o logout!");
    }
  }
}