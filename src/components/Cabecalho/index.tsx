import { Home } from "@mui/icons-material";
import { AppBar, Box,  IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Cabecalho() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar>
                <Toolbar>                
                    <Link to='/esfl/'>
                        <IconButton
                            size='small'
                            edge='start'                            
                            arial-label='Inicio'                            
                            sx={{mr: 2, color: 'whitesmoke'}}
                            >
                                <Home />
                        </IconButton>
                    </Link> 
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        Solilictação Limites Entidades Sem Fins Lucrativos
                    </Typography>                    
                </Toolbar>            
            </AppBar>
        </Box>
        
    );
}