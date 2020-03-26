import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes(){

    // O Switch controla as rotas deixando somente uma rota ser chamada por momento, mesmo com o nome semelhante,
    // não é obrigatório mas não custa nada manter ele.

    // As rotas não funcionam pelo exato, pelo fato de usar /, a rota pode ficar sempre na do Logon, então nessa rota usa 
    // clausula exact pra ser exatamente igual.

    return (

        <BrowserRouter>

            <Switch>

                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />

            </Switch>

        </BrowserRouter>

    );

}