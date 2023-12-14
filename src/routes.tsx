import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Solicitacao from './pages/Solicitacao';
import Solicitacoes from './pages/Solicitacoes';
import Login from './pages/Login';
import Cabecalho from './components/Cabecalho';
import DetalheSolicitacao from './pages/Solicitacao/DetalheSolicitacao';
import Calculo from './pages/Calculo';


// import { Container } from './styles';

const AppRouter: React.FC = () => {
  return <div>
    <BrowserRouter>
        <Cabecalho />
        <Routes>
            <Route path='/esfl' element={<Inicio />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/esfl/solicitacao/' element={<Solicitacao />} />
            <Route path='/esfl/solicitacoes/' element={<Solicitacoes />} />
            <Route path='/esfl/calculo/' element={<Calculo />} />
            <Route path='/esfl/solicitacoes/:id' element={<DetalheSolicitacao />} />
        </Routes>
    </BrowserRouter>
  </div>
    
  ;
}

export default AppRouter;