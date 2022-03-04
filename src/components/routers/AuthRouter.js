import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginScreen } from '../auth/LoginScreen'
import { RegisterScreen } from '../auth/RegisterScreen'


export const AuthRouter = () => {
    return (
        <div className='auth__main'>
            <div className='auth__box-container'>
                <Switch>
                    <Route exact path="/auth/login" component={ LoginScreen } />   
                    
                    <Route exact path="/auth/register" component={ RegisterScreen } />
                    
                    <Redirect to="/auth/login" />
                </Switch>
            </div>

        </div>
    )
}





/*
Router hijo del AppRouter que es el Router principal 
Tiene dos rutas y el redirect:
1.Ruta para que el usuario se logged e ingrese a la aplicación
2.Ruta para que el usuario se registre en caso de no estarlo.
3.El redirect que es caso de no ser ninguna de las rutas anteriores lo redireccione a la ruta del login.

*/
