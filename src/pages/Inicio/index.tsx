import React from 'react';

import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AddTask, Search } from '@mui/icons-material';

// import { Container } from './styles';

export default function Inicio() {
  return(  
    <Box sx={{marginTop: 7, marginLeft:2}}>
      
      <Link to='/esfl/solicitacao/'>
          <Button sx={{margin: 2, width: 250, backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}} variant='contained' startIcon={<AddTask />}>
            Cadastrar
        </Button>
      </Link>
      <Link to='/esfl/solicitacoes/'>
          <Button sx={{margin: 2, width: 250, backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}} variant='contained' startIcon={<Search/>}>
            Consultar
          </Button>      
      </Link>
      <Link to='/esfl/calculo/'>
          <Button sx={{margin: 2, width: 250, backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}} variant='contained' startIcon={<Search/>}>
            Consultar Cálculo
          </Button>      
      </Link>      
    </Box>
  );
}