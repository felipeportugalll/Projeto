import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Footer from '../../../components/adminMenu/footerAdminMenu';
import AdminMenu from '../../../components/adminMenu/adminMenu';
import { getUserType } from '../../../services/auth';

import DashAdmin from './Admin';
import DashFuncionario from './Funcionario';
import DashAluno from './Aluno';

const mdTheme = createTheme();

function getDashboard(){
  if(getUserType()==='1'){
    return <DashAdmin/>
  }else if(getUserType()==='2'){
    return <DashFuncionario/>
  }else{
    return <DashAluno/>
  }
};

export default function Dashboard() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <AdminMenu title={'DASHBOARD'} />
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
          <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {getDashboard()}
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
