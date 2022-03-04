import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
    return (

        <BrowserRouter>
            <div>

                <Switch>
                    <Route path={'/auth'} component = { AuthRouter } />    
                    <Route exact path={'/'} component = { JournalScreen } />

                    <Redirect to="/auth/login" />
                </Switch>

            </div>
        </BrowserRouter>
    )
}




/*
Componente de Rutas principal con version de router 5.3.0
En esta version se usa el Switch para envolver las rutas. 
Este componente tiene dos rutas:
1. Al AuthRouter que es mi otro componente de rutas para autenticacion de usuario
2. Es a la aplicación cuando ya el usuario esta autenticado
3. Redirect que es para que cualquier otra ruta que no sea ninguna de las ateriores va a redireccionar a la ruta del login



el '/auth'  se pone para indicar que no es exact


Este componente de Rutas debe ser llamado en el componente principal de la aplicación en este caso el JournalApp
*/

