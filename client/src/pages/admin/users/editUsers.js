import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Footer from '../../../components/adminMenu/footerAdminMenu';
import AdminMenu from '../../../components/adminMenu/adminMenu';
import Button from '@mui/material/Button';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';

const mdTheme = createTheme();

export default function RegisterUsers() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');

  const {idUser} = useParams();

  useEffect(() => {
    async function getUser(){
      const response = await api.get('/api/usuarios.details/'+idUser);
      
      setName(response.data.user_name);
      setEmail(response.data.user_email);
      setPassword(response.data.user_password);
      setType(response.data.user_type);
    }
    getUser();
  },);


  async function handleSubmit(event){
    event.preventDefault();
    const data = {
      user_name:name,
      user_email:email,
      user_password:password,
      user_type:type,
      _id:idUser
    }
    
    //chamando a api com axios para criar e armazenar o user 
    if(name!==''&&email!==''&&password!==''&&type!==''){
      const response = await api.put('/api/users',data);
    
    if(response.status===200){
      window.location.href='/admin/users'
    }else{
      alert('Erro ao atualizar o usuários!')
    }
  }else{
    alert('Preencha todos os dados!');
  }

  };


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AdminMenu title={'USUÁRIOS'} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>            
          <Grid container spacing={3} justifyContent="center">
            <Paper sx={{
                      p: 15,
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'auto',
                    }}>
              <h2>Atualização de Usuários</h2>        
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="nome"
                    name="nome"
                    label="Nome Completo"
                    fullWidth
                    autoComplete="nome"
                    variant="standard"
                    value={name}
                    onChange={e => setName(e.target.value)} //no evento pego valor digitado e atualizo name
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="standard"
                    value={email}
                    onChange={e => setEmail(e.target.value)} //atualiza a variável email
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="password"
                    required
                    id="senha"s
                    name="senha"
                    label="Senha"
                    fullWidth
                    autoComplete="senha"
                    variant="standard"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id="labelTipo">Tipo</InputLabel>
                    <Select
                      labelId="labelTipo"
                      id="tipo"
                      value={type}
                      label="Tipo"
                      onChange={e => setType(e.target.value)}
                    >
                      <MenuItem value={1}>Administrador</MenuItem>
                      <MenuItem value={2}>Funcionário</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button onClick={handleSubmit} variant="contained">Salvar</Button>
                </Grid>
                </Grid>            
            </Paper>
          </Grid>
          <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
