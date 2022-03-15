
//REDUCER PARA MANEJAR EL LOADING Y EL ERROR

import { types } from "../types/types"


const initialState = {
    loading: false,
    msgError: null
}//forma del initialState una vez se abre la aplicación




export const uiReducer = ( state=initialState, action )=>{
    
    switch (action.type){
        case types.uiSetError:
            return{
                ...state,
                msgError: action.payload
            }
        case types.uiRemoveError:
            return{
                ...state,
                msgError: null
            }

        case types.uiStartLoading:
            return{
                ...state,
                loading:true,
            }

        case types.uiFinishLoading:
            return{
                ...state,
                loading:false,
            }

        default:
            return state
    }




}






/*
initialState es el estado inicial del uiReducer que maneja el estado del componente <RegisterScreen/>.

El uiSetError y uiRemoveError son importados de los types y usados en el actions ui.js

*/



