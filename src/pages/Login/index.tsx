import { useState } from 'react';

import { Box, Button, TextField } from "@mui/material";
import Swal from 'sweetalert2';
import { Link, Navigate } from 'react-router-dom';

export default function Login() {

    const [chave, setChave] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        
        Swal.fire({
            icon: 'info',
            title: 'Aviso',
            text: 'Login chamado'
        })
    }
    return (
        <div>
            <Box component='form' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 40}}  onSubmit={handleLogin}>

                <TextField 
                    sx={{margin: 1, width: 140}}
                    label='Chave F'
                    value={chave}
                    onChange={evento => setChave(evento.target.value)}
                    size='small'
                />

                <TextField
                sx={{margin: 1, width: 140}}
                    label='Senha'
                    type='password'
                    value={senha}
                    onChange={evento => setSenha(evento.target.value)}
                    size='small'
                />

                <Link to='/'>
                    <Button sx={{margin: 2,width: 40}} type='submit' variant='outlined' color='primary' size='small'>Logar</Button>
                </Link>
            </Box>

        </div>
    );
}