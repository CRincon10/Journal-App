import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry'

export const JournalEntries = () => {

    const { notes } = useSelector( state => state.notes );
    // console.log(notes)

    return (

        <div className='journal__entries pointer animate__animated animate__fadeIn animate__faster'>
            
            {
                notes.map( note =>(
                    <JournalEntry 
                        key = {note.id}
                        {...note}    
                    />
                ))
            }
            

        </div>
    )
}













/*
Componente dentro del Sidebar que mediante el useSelector obtiene el state del reducer notes

notes.map barre cada uno de los elementos que tiene el objeto y retorna cada uno como un objeto independiente
llama al <JournalEntry/> y como key mando el id de las notes y con el operador spred cada una de las props de las notes que son el (id, title, body, imageUrl, date)

Componente <JournalEntry se crea basado en la cantidad de notes que hay en el <JournalEntries/> 


*/