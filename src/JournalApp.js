import React from 'react'
import { Provider } from 'react-redux'

import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'



export const JournalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}







/*
Provider funcion de Redux para proveer informacion a sus componentes hijos en este caso el AppRouter y la propiedad que va a proveer la defino como estore y es el store que 
es el que contiene el reducer


*/

