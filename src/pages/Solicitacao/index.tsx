import { Box, Button,  Paper,  TextField } from "@mui/material";
import {  useState } from "react";
import Swal from 'sweetalert2';
import api from "../../services/api";
import IEsfl from "../../types/IEsfl";
import ISolicitacaoEsfl from "../../types/ISolicitacaoEsfl";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

export default function Solicitacao() {  

    const [mci, setMci] = useState('');
    const [mciFinal, setMciFinal] = useState('');
    const [limiteProtoposto, setLimiteProposto] = useState('');
    const [subLimiteRotativo, setSubLimiteRotativo] = useState('');
    const [subLimiteInvestimento, setSubLimiteInvestimento] = useState('');
    const [subLimiteRecebiveis, setSubLimiteRecebiveis] = useState('');
    const [parecer, setParecer] = useState('');
    const [calculo, setCalculo] = useState <IEsfl> ();
    const [publicoAlvo, setPublicoAlvo] = useState('');
  

    /* useEffect(() => {       
            api.get(`calculos/mci/${mciFinal}`)
            .then((resposta) => {
                setCalculo(resposta.data);
                setPublicoAlvo('');
            }).catch(error => {
                setCalculo(undefined);
            });
            
        }, [mciFinal]); */

    const handleMci = ((e: any) => {
        
        api.get(`calculos/mci/${mci}`)
            .then((resposta) => {
                setCalculo(resposta.data);
                setPublicoAlvo('');
            }).catch(error => {
                setCalculo(undefined);                
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cliente não é público alvo de análise\npela metodologia 8!'
                })
            });
        setMciFinal(mci);
    }     
    );

    const handleSolicitacao = ((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const solicit : ISolicitacaoEsfl = {            
            mci: Number(mciFinal),
            dataSolicitacao: new Date(),
            limiteProposto: Number(limiteProtoposto),
            subLimiteRotativo: Number(subLimiteRotativo),
            subLimiteInvestimento: Number(subLimiteInvestimento),
            subLimiteRecebiveis: Number(subLimiteRecebiveis),
            parecerAgencia: parecer.length > 0 ? parecer : ''
        };   

        api.post('solicitacoesesfl/', solicit)
        .then(() => {
            setMci('');
            setMciFinal('');
            setLimiteProposto('');
            setSubLimiteRotativo('');
            setSubLimiteInvestimento('');
            setSubLimiteRecebiveis('');
            setParecer('');
            setCalculo(undefined);
            setPublicoAlvo('');
            Swal.fire({
                icon: 'success',
                title: 'Solicitação Atendida',
                text: 'Solicitação Aprovada, aguardar rotina de gravação do limite!'
            })
        }).catch(error => console.log(error))        
    });

    return (
        <div>
            <Link to='/esfl' >
                <Button sx={{mt: 10, ml: 2, backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}}  size='small' variant='outlined' startIcon={< ArrowBack/>}>Voltar</Button>
            </Link> 
            <Box component='div' sx={{display:'flex', marginLeft: 2, marginTop: 2}}>                
                <TextField 
                    id='mci'
                    name='mci'
                    value={mci}                     
                    onChange={evento => setMci(evento.target.value)}                
                    placeholder='Informe o MCI'            
                    variant='filled'  
                    size='small'               
                    
                />
                <Button sx={{ ml: 1, backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}} onClick={handleMci} >Verificar MCI</Button>                 
                                           
            </Box>            
            <Paper elevation={3} sx={{ml: 2, mr: 2}}>
                {
                    calculo &&
                    <Box component='form' sx={{ marginLeft:4 , marginTop: 1}} onSubmit={handleSolicitacao}>
                        <Box>
                            <TextField
                                id='limiteProposto'
                                name='limiteProposto'
                                label='Limite Proposto:'
                                value={limiteProtoposto}
                                onChange={evento => setLimiteProposto(evento.target.value)}
                                sx={{margin: 1}}
                            />
                            <TextField
                                id='subLimiteRotativo'
                                name='subLimiteRotativo'
                                label='Rotativo:'
                                value={subLimiteRotativo}
                                onChange={evento => setSubLimiteRotativo(evento.target.value)}
                                sx={{margin: 1}}
                            />
                            <TextField
                                id='subLimiteInvestimento'
                                name='subLimiteInvestimento'
                                label='Investimento:'
                                value={subLimiteInvestimento}
                                onChange={evento => setSubLimiteInvestimento(evento.target.value)}
                                sx={{margin: 1}}
                            />
                            <TextField
                                id='subLimiteRecebiveis'
                                name='subLimiteRecebiveis'
                                label='Recebíveis'
                                value={subLimiteRecebiveis}
                                onChange={evento => setSubLimiteRecebiveis(evento.target.value)}
                                sx={{margin: 1}}
                            />
                        </Box>  
                        
                        <TextField
                            id='parecerAgencia'
                            name='parecerAgencia'
                            label='Parecer'
                            value={parecer}
                            onChange={evento => setParecer(evento.target.value)}
                            multiline
                            rows={8}
                            sx={{width: 500, margin: 1}}
                        />
                        <Box>
                            <Button sx={{ ml: 1, mb: 1, backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}} type="submit">Salvar</Button>
                        </Box>
                        
                    </Box>
                }
                {
                    publicoAlvo &&
                    <span>{publicoAlvo}</span>
                }
            </Paper>                
        </div>
       
        
    );

}