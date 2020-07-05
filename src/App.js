import React from 'react';
import Logo from './componentes/logo'
import Rotas from './rotas'
import { HashRouter } from 'react-router-dom'
function App() {
  return (
    <HashRouter>
      <div className="App" >
        <Logo />
        <Rotas />

      </div>
    </HashRouter>
  );
}

export default App;
