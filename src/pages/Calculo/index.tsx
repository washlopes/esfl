import React, { useState } from 'react';
import IEsfl from '../../types/IEsfl';
import api from '../../services/api';
import Swal from 'sweetalert2';
import { Box, Button, InputLabel, Paper, TextField } from '@mui/material';
import { ArrowBack, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

const Calculo: React.FC = () => {

    const [calculo, setCalculo] = useState<IEsfl>();
    const [mci, setMci] = useState('');  
    const [mciBox, setMciBox] = useState('');

    const handleCalculo = ((evento: React.ChangeEvent<HTMLFormElement>) => {
        evento.preventDefault();       
        
        setMciBox(mci);

        if (mci !== '') {
            api.get<IEsfl>(`calculos/mci/${mci}`)
                .then((resposta) => {
                    setCalculo(resposta.data);
                }).catch(error => Swal.fire({
                    icon: 'error',
                    title: 'Busca de Cálculo',
                    text: 'Não existe cálculo para o MCI informado'
                }))
        };

        setMci('');

    });

    return <Box>
        <Box sx={{mt: 10, ml: 2}}>                
            <Link to='/esfl/'>
                <Button sx={{ backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}} size='small' variant='outlined' startIcon={< ArrowBack/>}>Voltar</Button>
            </Link>                
        </Box>
        <Box component='form' onSubmit={handleCalculo} sx={{mt: 1}}>
            <TextField
                label= 'MCI'
                name='mci'
                id='mci'
                value={mci}
                size='small'
                variant='filled'
                onChange={evento => setMci(evento.target.value)}
                sx={{ml: 2, width: 180}}
            />
            <Button sx={{ml: 1, mt: 1, backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}} type='submit' variant='outlined' startIcon={<Search />}>Buscar</Button>
            {calculo && 
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Paper sx={{ml: 2, mr:2, mt: 1, height: 300, width: 880}} elevation={3}>                        
                        <Box sx={{ml: 2, mt: 4}} title={mciBox}>
                            <InputLabel sx={{ml: 1, mb: 2, color:'darkgray', fontWeight:'bold'}}>MCI: {mciBox}</InputLabel>
                            <Box sx={{mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                                <InputLabel sx={{ml: 1, mb: 2, color:'darkgray', fontWeight:'bold'}}>Risco Diris: {calculo.riscoDiris}</InputLabel>
                                <InputLabel sx={{ml: 2, mb: 2, color:'darkgray', fontWeight:'bold'}}>Risco: {calculo.riscoNivel5}</InputLabel>
                            </Box>
                            <Box sx={{marginTop: 1}}>
                                <TextField 
                                    disabled
                                    label='Limite Sugerido 1:'
                                    value={calculo?.limiteV1}                    
                                    size='small'
                                    InputLabelProps={{shrink: true}}
                                    sx={{marginLeft: 1, width: 200, input: {textAlign: 'right'}}}
                                />
                                <TextField sx={{marginLeft: 1, width: 200,  input: {textAlign: 'right'}}}
                                    disabled
                                    label='Rotativo Sugerido 1:'                
                                    value={calculo?.rotativoV1}                    
                                    size='small'
                                    InputLabelProps={{shrink: true}}                        
                                />
                                <TextField sx={{marginLeft: 1,  width: 200,  input: {textAlign: 'right'}}}
                                    disabled
                                    label='Investimento Sugerido 1:'                
                                    value={calculo?.investimentoV1}                    
                                    size='small'
                                    InputLabelProps={{shrink: true}}                        
                                />
                                <TextField sx={{marginLeft: 1, width: 200,  input: {textAlign: 'right'}}}
                                    disabled
                                    label='Recebíveis Sugerido 1:'                
                                    value={calculo?.recebiveisV1}                    
                                    size='small'
                                    InputLabelProps={{shrink: true}}
                                />                                
                            </Box> 
                            <Box sx={{marginTop: 1}}>
                                <TextField sx={{marginLeft: 1, width: 200,  input: {textAlign: 'right'}}}
                                    disabled
                                    label='Limite Sugerido 2:'
                                    value={calculo?.limiteV2}                    
                                    size='small'
                                    InputLabelProps={{shrink: true}}                        
                                />
                                <TextField sx={{marginLeft: 1, width: 200,  input: {textAlign: 'right'}}}
                                    disabled
                                    label='Rotativo Sugerido 2:'                
                                    value={calculo?.rotativoV2}                    
                                    size='small'
                                    InputLabelProps={{shrink: true}}
                                />
                                <TextField sx={{marginLeft: 1, width: 200,  input: {textAlign: 'right'}}}
                                    disabled
                                    label='Investimento Sugerido 2:'                
                                    value={calculo?.investimentoV2}                    
                                    size='small'
                                    InputLabelProps={{shrink: true}}
                                />
                                <TextField sx={{marginLeft: 1,  width: 200,  input: {textAlign: 'right'}}}
                                    disabled
                                    label='Recebíveis Sugerido 2:'                
                                    value={calculo?.recebiveisV2}                    
                                    size='small'
                                    InputLabelProps={{shrink: true}}
                                />
                            </Box>                                 
                        </Box> 
                    </Paper>
                </Box>
            }
        </Box>
    </Box>;
}

export default Calculo;