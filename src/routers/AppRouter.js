import React, { useEffect, useState } from 'react'
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config'
import { login } from '../actions/authActions';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { starLoadingNotes } from '../actions/notesAction';



export const AppRouter = () => {
    
    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)    


    
    
    useEffect(() => {
      
        firebase.auth().onAuthStateChanged( async(user)=>{   //Primer punto donde se obtiene el id del usuario
            
            if( user?.uid ){            //? si el objeto user tiene algo entonces quiero el .uid is no existe la condicion inmediatamente se sale
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)     //si el usuario esta logged isLoggedIn esta en true

                
                dispatch(starLoadingNotes(user.uid))

            }else {
                setIsLoggedIn(false)    //caso contrario el isLoggedIn esta en false
            }

            setChecking(false)     //en este punto cambio el estado del checking en false porque ya tengo la respuesta del firebase


        })
      
    }, [ dispatch, setChecking ])

    if (checking){              //de manera condicional si el checking esta en true y en este punto esta en true retorne el esperando pero aca podria crear un componente de espera con mejor diseño 
        return(
            <h1>Waiting....</h1>
        )
    }
    
    return (

        <BrowserRouter>
            <div>

                <Switch>
                    <PublicRoutes 
                        path={'/auth'} 
                        component = { AuthRouter } 
                        isAuthenticated = {isLoggedIn}
                    />    
                    
                    <PrivateRoutes 
                        exact 
                        path={'/'} 
                        component = { JournalScreen } 
                        isAuthenticated={isLoggedIn}
                        
                    />

                    <Redirect to="/auth/login" />
                </Switch>

            </div>
        </BrowserRouter>
    )
}




/*
Componente de Rutas principal con version de router 5.3.0
Y DONDE SE OBTIENE EL ID DEL USUARIO POR PRIMERA VEZ
En esta version se usa el Switch para envolver las rutas. 
Este componente tiene dos rutas:
1. Al AuthRouter que es mi otro componente de rutas para autenticacion de usuario
2. Es a la aplicación cuando ya el usuario esta autenticado
3. Redirect que es para que cualquier otra ruta que no sea ninguna de las ateriores va a redireccionar a la ruta del login


useState  checking   ==> si esta autenticado yo se que tiene uid sino esta autenticado obviamente no lo tiene para eso espero la respuesta del useEffect que es quien me lo confirma.
La idea es que quien tenga checking que esta en true es porque esta revisando y esperando el estado del user en firebase y aun no tengo respuesta y miesntras este en true no 
voy a mostrar ninguna ruta de mi aplicacion. y setChecking es quien me lo confirma y cambia el estado del checking.

useState isLoggedIn ==> confirma si esta autenticado o no para manejo de rutas y poder dirigirlo o a mi aplicacion <JournalScreen/> o al <AuthRouter/>



useEffect  ==> para que este pendiente del cambio que se hace en la funcion onAuthStateChanged que se ejecuta cuando el estado del usuario cambie y no tiene dependencia es decir
que solo se ejecuta una vez.
En esta aplicacion mantiene al usuario autenticado asi se haga refresh de la página

onAuthStateChanged   ==> es propio de firebase y me dice o esta pendiente de cada vez que el usuario o autenticacion de mi aplicacion cambia, crea un observable que es un tipo de 
objeto especial que se puede disparar mas de una vez, es decir cuando la autenticacion cambia se va a disparar cuando se vuelve a autenticar un usuario se vuelve a disparar si otra vez
se vuelve a logguiar sin hacer refresh de la página se vuelve a disparar. recibe los datos del usuario que se autentica. pero si el usuario no esta autenticado el {user} va a estar en null
Tambien llama
la action starLoadingNotes definida en notesAction que carga las notas al redux y este a su vez al store

dispatch(setNotes(notes))  ==> disparo la accion setNotes que se encarga de mandar las notes guardadas en la constante notes que retorna la promesa del helper en el reducer y este a su vez 
en el store


el '/auth'  se pone para indicar que no es exact


Este componente de Rutas debe ser llamado en el componente principal de la aplicación en este caso el JournalApp
*/

