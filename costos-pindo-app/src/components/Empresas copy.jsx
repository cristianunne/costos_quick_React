
import * as React from 'react';
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';

const Empresas = ({color}) => {
    return (

        <React.Fragment>

            <Box sx={{ width: '100%', height: '50%' }}>

            <Grid container sx={{ width: '100%', height: '100%', paddingTop: 1, paddingBottom: 1 }}>

                <Box sx={{backgroundColor: '#1d4f7c', width: '100%', height: '100%'}}>

                    <Typography variant="h3" component="h3">
                        h1. Heading
                    </Typography>
                    
                </Box>
            </Grid>
            </Box>

        </React.Fragment>


    )
}

export default Empresas
