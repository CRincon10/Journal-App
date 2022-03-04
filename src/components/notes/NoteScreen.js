import React from 'react'
import { NotesAppbar } from './NotesAppbar'

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            
            <NotesAppbar/>

            <div className='notes_content'>

                <input 
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                />

                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'
                >
                </textarea>

                <div className='notes__image'>
                    <img 
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4CntPofMmPvZ4BHyJRAfHV885EAFG2q8o5w&usqp=CAU'
                        alt='pic'
                    />
                </div>


            </div>


        </div>
    )
}















/*
Componente que contiene las notas en el componente <NotesAppbar/> y el formulario
y las muestra en el main del <JournalScreen/> cuando hayan notas, y el usuario no este en <NothingScreen/> 


*/