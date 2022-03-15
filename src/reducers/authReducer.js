/* DE ESTA FORMA DEBE LUCIR EL STATE
El state va a estar vacio por defecto cuando el usuario no este autenticado 
cuando este autenticado va a ser un objeto con: 
{
    uid: 'sdfgqijroti13456'     proveido por Firebase
    name: 'Cristian'
}

*/

import { types } from "../types/types";



export const authReducer = (state = {}, action)=>{

    switch (action.type){

        case types.login:{  
            return{ 
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        }  
        case types.logout:
            return{ }
        

        default:
            return state;

    }


}







/*
Reducer solo de la autenticacion
case login: el uid y el name me los proporciona Firebase
case logout: que vuelva a ser un objeto vacio
default: retorna el mismo estado que por defecto es un objeto vacio

los types estan definidos en la carpeta types/types.js



*/