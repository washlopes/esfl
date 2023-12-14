import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ISolicitacaoEsfl from '../../types/ISolicitacaoEsfl';
import api from '../../services/api';
import Swal from 'sweetalert2';
import { ArrowBack, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

export default function Solicitacoes() {

  const [solicits, setSolicits] = useState<ISolicitacaoEsfl[]>([]);  

  const [mci, setMci] = useState('');
  const [filtrar, setFiltrar] = useState<Boolean>(false);

  useEffect(() => {
    
    api.get<ISolicitacaoEsfl[]>('solicitacoesesfl/')
      .then((resposta) => {
        setSolicits(resposta.data);        
      })
      .catch(error => console.log(error))

  }, [])

  const handlePesquisa = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    
    setFiltrar(true);

    if (mci !== '') {
      api.get<ISolicitacaoEsfl[]>(`solicitacoesesfl/mci/${mci}`)
      .then((resposta) => {
        setSolicits(resposta.data);        
      }).catch(error => Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Nenuma solicitação encontrada para o MCI informado!'
      }))
    } else {
      api.get<ISolicitacaoEsfl[]>(`solicitacoesesfl/`)
      .then((resposta) => {
        setSolicits(resposta.data);        
      }).catch(error => Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error
      }))
    }
  }  

  return (<div>
    <Box sx={{mt: 10, ml: 2}}>                
      <Link to='/esfl'>
        <Button sx={{backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}}  size='small' variant='outlined' startIcon={< ArrowBack/>}>Voltar</Button>
      </Link>                
    </Box>
    <Box component='form' onSubmit={handlePesquisa} sx={{marginTop:2, marginLeft: 2}}>
      <TextField 
        size='small'
        label='Informe MCI:'        
        variant='filled'
        value={mci}
        autoFocus={true}
        onChange={evento => setMci(evento.target.value)}
        />
      <Button sx={{ ml: 1, mt: 1,  backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}} type='submit' size='small' startIcon={< Search />}>
        Pesquisar
      </Button>
    </Box>
    { filtrar && 
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>MCI</TableCell>
            <TableCell>Limite Proposto</TableCell>
            <TableCell>Rotativo</TableCell>
            <TableCell>Investimento</TableCell>
            <TableCell>Recebíveis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>         
          {solicits && solicits.map((solicitacao) => (
            <TableRow>
              <TableCell>
                <Link to={`/esfl/solicitacoes/${solicitacao.id}`}> {solicitacao.mci} </Link>
              </TableCell>
              <TableCell>{solicitacao.limiteProposto}</TableCell>
              <TableCell>{solicitacao.subLimiteRotativo}</TableCell>
              <TableCell>{solicitacao.subLimiteInvestimento}</TableCell>
              <TableCell>{solicitacao.subLimiteRecebiveis}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    }    
    
  </div>);
}
