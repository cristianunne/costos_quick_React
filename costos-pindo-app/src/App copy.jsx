import { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/system/Unstable_Grid';
import Typography from '@mui/material/Typography';
import Empresas from './components/Empresas';



function App() {

  const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
  }));


  const getEmpresas = async () => {

    let headers = new Headers();

    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body



    let url = 'http://localhost/sap_api/API/index';

    const data_request = await fetch(url, {
        method: 'POST',
        headers: headers,
        
    });

    try {
        const content = await data_request.json();
        console.log(content);

        //user = content;
        return content;
    } catch (err) {
        //console.log(err);
        return false;
    }
  }




  useEffect(() => {

    getEmpresas();


  })

  return (
    <Box sx={{ display: 'flex' }}>

      <Box
        component="main"
        sx={{
          backgroundColor: '#24385b',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >

        <Grid container sx={{ height: '100%' }}>
          <Grid xs={2} sx={{ height: '100%', backgroundColor: '#24385b'}} 
          spacing={3}>
           <Empresas ></Empresas>
           <Empresas ></Empresas>
          </Grid>
          <Grid xs={10} sx={{ height: '100%', }}>
            <Item>xs=4</Item>
          </Grid>
         
        </Grid>

      </Box>

    </Box>
  )
}

export default App
