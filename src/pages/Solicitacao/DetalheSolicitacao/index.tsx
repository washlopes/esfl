import { Box, Button, InputLabel, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ISolicitacaoEsfl from "../../../types/ISolicitacaoEsfl";
import { Link, useParams } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import IEsfl from "../../../types/IEsfl";
import { ArrowBack } from "@mui/icons-material";

export default function DetalheSolicitacao() {

    const [solicitacao, setSolicitacao] = useState<ISolicitacaoEsfl | undefined> (undefined);
    const [calculo, setCalculo] = useState<IEsfl>();    
    const [mci, setMci] = useState(0);
    const parametros = useParams();
    
    useEffect(() => {

        console.log(parametros);
        api.get<ISolicitacaoEsfl>(`solicitacoesesfl/id/${parametros.id}`)
        .then((resposta) => {
            setSolicitacao(resposta.data);
            setMci(resposta.data.mci);
        })
        .catch(error => Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error
        }));

        if (mci > 0) {
            api.get(`calculos/mci/${mci}`)
            .then((resposta) => {
                setCalculo(resposta.data);                
            }).catch(error => {                
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cliente não é público alvo de análise pela metodologia 8!'
                })
            });
        }
        
    }, [parametros, mci]);

    return <div>
            <Box sx={{mt: 10, ml: 2}}>                
                <Link to='/esfl/solicitacoes/'>
                    <Button sx={{backgroundColor:'#2399e5', color: 'white', fontWeight: 'bold'}} size='small' variant='outlined' startIcon={< ArrowBack/>}>Voltar</Button>
                </Link>                
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Paper sx={{ml: 2, mr:2, mt: 1, height: 500, width: 880}} elevation={3}>
                    <Box sx={{ml: 2, mt: 6}}>
                        <Box sx={{mt: 2, width: 110}}>
                            <InputLabel                                                                 
                                sx={{ml: 1, mb: 2, color:'darkgray', fontWeight:'bold'}}
                            >MCI: {solicitacao?.mci}</InputLabel>                            
                        </Box>                        
                        <Box sx={{mt: 1}}>
                            <Box sx={{mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                                <InputLabel sx={{ml: 1, mb: 2, color:'darkgray', fontWeight:'bold'}}>Risco Diris: {calculo?.riscoDiris}</InputLabel>
                                <InputLabel sx={{ml: 2, mb: 2, color:'darkgray', fontWeight:'bold'}}>Risco: {calculo?.riscoNivel5}</InputLabel>
                            </Box>
                            <TextField 
                                disabled
                                label='Limite Sugerido 1:'
                                value={calculo?.limiteV1}                    
                                size='small'
                                InputLabelProps={{shrink: true}}
                                sx={{ml: 1, width: 200, input: {textAlign: 'right'}}}
                            />
                            <TextField sx={{ml: 1, width: 200,  input: {textAlign: 'right'}}}
                                disabled
                                label='Rotativo Sugerido 1:'                
                                value={calculo?.rotativoV1}                    
                                size='small'
                                InputLabelProps={{shrink: true}}                        
                            />
                            <TextField sx={{ml: 1,  width: 200,  input: {textAlign: 'right'}}}
                                disabled
                                label='Investimento Sugerido 1:'                
                                value={calculo?.investimentoV1}                    
                                size='small'
                                InputLabelProps={{shrink: true}}                        
                            />
                            <TextField sx={{ml: 1, width: 200,  input: {textAlign: 'right'}}}
                                disabled
                                label='Recebíveis Sugerido 1:'                
                                value={calculo?.recebiveisV1}                    
                                size='small'
                                InputLabelProps={{shrink: true}}
                            />                
                            
                        </Box> 
                        <Box sx={{mt: 1}}>
                            <TextField sx={{ml: 1, width: 200,  input: {textAlign: 'right'}}}
                                disabled
                                label='Limite Sugerido 2:'
                                value={calculo?.limiteV2}                    
                                size='small'
                                InputLabelProps={{shrink: true}}                        
                            />
                            <TextField sx={{ml: 1, width: 200,  input: {textAlign: 'right'}}}
                                disabled
                                label='Rotativo Sugerido 2:'                
                                value={calculo?.rotativoV2}                    
                                size='small'
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField sx={{ml: 1, width: 200,  input: {textAlign: 'right'}}}
                                disabled
                                label='Investimento Sugerido 2:'                
                                value={calculo?.investimentoV2}                    
                                size='small'
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField sx={{ml: 1,  width: 200,  input: {textAlign: 'right'}}}
                                disabled
                                label='Recebíveis Sugerido 2:'                
                                value={calculo?.recebiveisV2}                    
                                size='small'
                                InputLabelProps={{shrink: true}}
                            />
                        </Box>
                        <Box sx={{mt: 1}}>
                            <TextField sx={{ml: 1, width: 200, input: {textAlign: 'right'}}}
                                disabled
                                label='Limite Proposto:'                
                                value={solicitacao?.limiteProposto}                    
                                size='small'
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField sx={{ml: 1, width: 200, input: {textAlign: 'right'}}}
                                disabled
                                label='Rotativo'                
                                value={solicitacao?.subLimiteRotativo}                    
                                size='small'
                                InputLabelProps={{shrink: true }}
                            />
                            <TextField sx={{ml: 1, width: 200, input: {textAlign: 'right'}}}
                                label='Investimento'                
                                value={solicitacao?.subLimiteInvestimento}
                                disabled
                                size='small'
                                InputLabelProps={{shrink: true}}                        
                            />
                            <TextField sx={{ml: 1, width: 200, input: {textAlign: 'right'}}}
                                label='Recebíveis'                
                                value={solicitacao?.subLimiteRecebiveis}
                                disabled
                                size='small'
                                InputLabelProps={{shrink: true}}                        
                            />
                        </Box>            
                            <TextField sx={{ml: 1, mt: 1, width: 500, input: {textAlign: 'right'}}}
                                label='Parecer Agência:'
                                multiline                                
                                title='Parecer da Agência:'
                                rows={8}
                                value={solicitacao?.parecerAgencia}
                                disabled
                                size='small'
                                InputLabelProps={{shrink: true}}
                            />            
                    </Box> 
                </Paper>
            </Box>
    </div>
}