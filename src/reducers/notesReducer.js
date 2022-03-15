/* Forma del state del noteReducer
    {
        notes: [],
        active: null,
        active:{
            id: ASGFAFDGLAKDFGMKM123    id del usuario
            title: 'string'
            body: 'string'
            imageUrl: 'string'
            date: 123415367
        }
    }
*/
import { types } from '../types/types'



const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = ( state = initialState, action )=>{

    switch (action.type){

        case types.notesActive:
            return{
                ...state,
                active:{
                    ...action.payload
                }
            }
        
        case types.notesAddNew:
            return{
                ...state,
                notes:[ action.payload, ...state.notes ]        //state.notes crea una nueva copa de las notas
            }


        case types.notesLoad:
            return{
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdated:
            return{
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id       //si son iguales esta es la nota que yo quiero actualizar
                        ? action.payload.note                   //entonces la nota va a ser la que trae el action.payload
                        : note                                  //sino sigue siendo la nota
                )
            }

        case types.notesDeleteUrl:
            return{
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }


        case types.notesLogoutCleaning:
            return{           
                notes:[],
                active:null,
            }

        


        
        default:
            return state
    }



}































/*
Reducer Notas ===>  tiene un objeto con propiedad notes que es un arreglo que maneja las notas que estan dentro del sidebar
                    tiene una nota active que puede estar en null o va a tener el objeto de la nota activa. Si tenemos null quiere decir que no hay ninguna nota activa
                    y aparece la pnatalla del componente <NothingSelected/>
                    pero si esta en active la nota seleccionada o nota creada va a tener un id proporcionado por firebase, title, body, imageUrl, date.


case types.notesActive: ===> con el operador spred me retorna el state que en este punto estaria como el initialState pero el active lo cambio
a un nuevo objeto que tiene el action.payload de la accion del notesAction

case notesLoad  ==> retorna el state como se encuentra en ese punto y el payload retorna la accion dentro de un arreglo, es decir va a retornar las 
notas dentro de un arreglo.

case types.notesUpdated  ==> retorna el state como se encuentra en ese punto y el payload recorre las notas del state con el .map y regresa un nuevo arreglo y
muta solo la nota que me interesa condicionalmente.

case types.deleteNote  ==> esparcimos el state para no perder el estado anterior como estoy borrando la nota activa, tambien tengo que purgar esta misma ya que no va a existir
asi que el active va a estar nuevamente en null
y la nota con el .filter me va a devolver todas las notas que tengan id diferente al del action.payload


*/