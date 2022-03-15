import React from 'react'
import {useSelector} from 'react-redux'


import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const {active} = useSelector( state => state.notes );

    // console.log(active)
    
    return (
        <div className='journal__main-content animate__animated animate__fadeIn animate__faster'>
            
            <Sidebar />

            <main>
                {
                    (active)
                        ?( <NoteScreen/> ) 
                        :( <NothingSelected/> )
                }    
            </main>


        </div>
    )
}





/*
Componente que de manera condicional y dependiendo del estado de la nota osea si active esta en null o esta activa segun se definio en el notesReducer va a mostrar
otro componente que puede ser <NothingSelected/> o <NoteScreen/>


*/