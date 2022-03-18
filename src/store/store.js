import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk'

import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import {notesReducer} from '../reducers/notesReducer.js';




const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose ;      //habilita las herramientas de devtools navegador

const reducers = combineReducers({
    auth: authReducer,                           //propiedad del reducers que es manejada por el authreducer  
    ui: uiReducer,
    notes: notesReducer,
})


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)



















/*
createStore()   ==> recibe como argumento el reducer pero solo recibe un reducer, la funcino solo puede ser llamada una vez. Es por eso que es necesario usar el combineReducers
dentro de el se difeine la estreuctura que va a tener el store de la aplicacion en general y aunque solo tenga un reducer se suele usar de esta forma ya que se hace mas facil
hacer cambios o implementaciones sin tener que refactorizar el, codigo.

el store se implementa en el punto mas alto de mi aplicacion en este caso <JournalApp/>

en este componente es neceario hacer la peticion http a una API, para poder obtener el uid y el displayName y como es una accion async no puedo usarla en el redux es por eso 
que ne hace necesario el uso de Thunk


*/