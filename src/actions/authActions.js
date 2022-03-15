import Swal from 'sweetalert2'
import {types} from '../types/types'
import {firebase, googleAuthProvider} from '../firebase/firebase-config'
import { uiFinishLoadingAction, uiStartLoadingAction } from './ui'
import { noteLogout } from './notesAction'





//action middelwere async en sync con uso del THUNK  LginScreen
export const startLoginEmailPassword = (email, password) =>{
    return(dispatch)=>{

        dispatch(uiStartLoadingAction())     //accion que modifica el state y pone el loading en true

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then( userCred =>{
                const {user} = userCred
                
                dispatch( login(user.uid,user.displayName)  )
                dispatch(uiFinishLoadingAction()) //accion que modifica el state y pone el loading en false
            } ).catch( e=>{
                // console.log(e)
                dispatch(uiFinishLoadingAction()) //accion que modifica el state y pone el loading en false
                Swal.fire('Error', e.message, 'error')
            } )
    }
}

export const startGoogleLogin = ()=>{
    return (dispatch)=>{
        
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( userCred =>{
                // console.log(userCred)   para ver las propiedades que retorna el userCred lo que necesito esta dentro del user que son el uid y el displayName
                const {user} = userCred
                dispatch(login(user.uid, user.displayName))

            }).catch( e=>{
                // console.log(e)
                Swal.fire('Error', e.message, 'error')
            } )
    }
}



//registerScreen
export const startRegisterWithEmailPasswordName = (name, email, password)=>{
    return(dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then( async({user}) =>{
                
                await user.updateProfile({displayName:name})
                console.log(user)
                
                dispatch(login(user.uid, user.displayName))
            }).catch( e =>{
                // console.log(e)
                Swal.fire('Error', e.message, 'error')
            })
    }   
}



//Logout del Sidebar
export const startLogout = ()=>{

    return(dispatch)=>{
        firebase.auth().signOut()

        dispatch(logout())
        dispatch(noteLogout())    //viene del notesAction
    }

}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
    
})

export const logout = ()=>({
    type: types.logout
})


























/*
Accion para autenticacion en el login
en este componente es neceario hacer la peticion http a una API, para poder obtener el uid y el displayName y como es una accion async no puedo usarla con el redux es por eso 
que ne hace necesario el uso de Thunk 'configuración del Thunk en el auth.js'


startLoginEmailPassword    ==> Esta funcion regresa un callback y el dispatch que tiene como argumento ese callback del return es proporcionado por Thunk
es por eso que despues podemos ejecutar la funcion del login con un usuario uid y un name displayName y mandar esa funcion startLoginEmailPassword al loginScreen
que es donde va a ser llamada para la autenticacion del usuario.
inicialmente disparo el uiStartLoadingAction que es una accion que modifica el state esta en <uiReducer/> y pone el loading en true mientras se hace la autenticacion del usuario
y despues disparo el uiFinishLoadingAction que es tambien una accion definida en el <uiReducer/> y pone el loading en false una vez se autentique el usuario.
También uso libreria de alertas 'sweetalert2' para el manejo de alertas en errores. La importo y esta alerta recibe 3 argumentos (titulo de la alerta, el cuerpo o 
mensaje de la alerta y el icono), en este caso como cuerpo maneje el error que me retorna de la peticion e.message

startGoogleLogin ==> Accion para autenticacion de google, configuracion predeterminada.

startRegisterWithEmailPasswordName   ==> Accion que hace peticion http con autenticacion de firebase y crea el email y password que es mandado por el usuario 
y que esta recibiendo como argumentos con la funcion propia de firebase createUserWithEmailAndPassword(). esto retorna una promesa con el userCred del que 
desestructuro el {user}, del user puedo obtener el displayName con user.updateProfile que me retorna un objeto con incluso con una foto si lo necesiato pero en este caso 
uso el displayName que va a ser igual al name que el usuario manda como argumento cuando se dispara la accion.
Tambien dispara el login con el user.id y el user.displayName que recibe del usuario.


*/



