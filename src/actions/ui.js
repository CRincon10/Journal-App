import { types } from "../types/types"



export const setErrorAction = (err)=>({
    type: types.uiSetError,
    payload: err
})
export const removeErrorAction = ()=>({
    type: types.uiRemoveError,
    
})

export const uiStartLoadingAction = ()=>({
    type: types.uiStartLoading,

})

export const uiFinishLoadingAction = ()=>({
    type: types.uiFinishLoading,
})




/*
dispara acciones llamadas en el componente <RegisterScreen/>

acciones que modifican el state

*/
