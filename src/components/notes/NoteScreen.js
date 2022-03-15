import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { NotesAppbar } from './NotesAppbar'
import {useForm} from '../../hooks/useForm'
import { activeNote, startDeleting } from '../../actions/notesAction'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const {active: noteActive} = useSelector( state => state.notes );   //solo me trae la nota que este activa
    const [ formValues, handleInputChange,reset ] = useForm(noteActive)
    const { body, title, id } = formValues
    const activeId = useRef( noteActive.id )  //almacena una variable mutable que no redibuja todo el componente si cambia

    //efecto que cambia la nota que esta activa para mostrarla en la pantalla ppal
    useEffect(() => {
    
        if( noteActive.id !== activeId.current ){
            reset(noteActive)
            activeId.current = noteActive.id
        }
      
    }, [noteActive,reset])
    //reset se ejecuta solo si el id de la nota activa es diferente
    
    //efecto que esta pendiente del cambio de los valores del formulario y los dispara en la action activeNote al redux
    useEffect(() => {
        
        dispatch(activeNote(formValues.id,{...formValues}))

    }, [formValues,dispatch])

    const handleDelete = ()=>{
        dispatch(startDeleting(id));

    }
    

    return (
        <div className='notes__main-content'>
            
            <NotesAppbar/>

            <div className='notes_content'>

               
                <input 
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    name='title'
                    autoComplete='off'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>
              
                {
                    (noteActive.imageUrl) &&
                    <div className='notes__image'>
                        <img 
                            src={ noteActive.imageUrl }
                            alt='imagen'
                        />
                    </div>
                }


            </div>

            <button 
                className='btn btn-danger'
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}

















/*
Componente que contiene las notas en el componente <NotesAppbar/> y el formulario
y las muestra en el main del <JournalScreen/> cuando hayan notas, y el usuario no este en <NothingScreen/> 

Muestra y dispara los cambios que hace el usuario en todo el campo de trabajo.

useSelector  ==>  me trae la referencia a la nota activa

useRef ==> almacena una variable mutable que no va a redibujar todo el componente, en este caso el id de la notaActiva
useEffect  ===>  Cuidado con el efecto para no causar un efecto ciclico es decir el efecto vuelva a disparar el useForm, este vuelva a redibujar
el componente y así en un ciclo infinito que consuma todo el espacio de ram.
(reset) se ejecuta solo si el id de la nota activa es diferente
el useRef almacena el noteActive.id con el valor que tiene hasta ese momento y con el effect disparo el reset con la nueva
nota activa solo cuando el noteActive.id es diferente o cambio su estado actual y se lo indico con el activeId.current y 
cuando el reset se dispare el activeid.current ahora va a ser igual a la noteActive.id

useRef ==> dispara la accion activeNote 



el boton de save toma la nota activa y va a ejecutar el push al db de firebase



*/