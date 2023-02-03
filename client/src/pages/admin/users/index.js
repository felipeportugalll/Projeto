import React, {useState, useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Footer from '../../../components/adminMenu/footerAdminMenu';
import AdminMenu from '../../../components/adminMenu/adminMenu';
import api from '../../../services/api';


const mdTheme = createTheme();

/*function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

  const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/


export default function UsersList() {

  const [users, setUsers] = useState([]);

  useEffect(() =>{

    async function loadUsers(){
      const response = await api.get("/api/users");
      setUsers(response.data); 
    }
    loadUsers();
  },[]);

  async function handleDelete(id){
    if(window.confirm("Deseja realmente excluir este usuário?")){
      const result = await api.delete('/api/users/'+id);
      if(result.status ===200){
        window.location.href = '/admin/users';
      }else{
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Paper sx={{
                        p: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                      }}>
                  <h2>Listagem de Usuários</h2>        
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell align="center">Email</TableCell>
                              <TableCell align="center">Tipo</TableCell>
                              <TableCell align="center">Data de cadastro</TableCell>
                              <TableCell align="center">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {users.map((row) => (
                              <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.user_name}
                                </TableCell>
                                <TableCell align="center">{row.user_email}</TableCell>
                                <TableCell align="center">{row.user_type===1?<Chip label="Administrador" color='primary'/>:<Chip label="Funcionário" color='secondary'/>}</TableCell>
                                <TableCell align="center">{new Date(row.createdAt).toLocateString('pt-br')}</TableCell>
                                <TableCell align="right">
                                  <ButtonGroup variant="contained" aria-label="outlined button group">
                                    <Button color='primary' href={'/admin/usuarios/editUsers/:idUser'+row._id}>Atualizar</Button>
                                    <Button color='secondary' onClick={() => handleDelete(row._id)}>Excluir</Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>                    
                  </Grid>            
                </Paper>
              </Grid>
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
