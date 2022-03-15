import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import {startSaveNote, startUpLoadin} from '../../actions/notesAction'


export const NotesAppbar = () => {

    const dateMoment = moment()
    const dispatch = useDispatch();
    const {active} = useSelector( state => state.notes );

    const handlePictureClick = ()=>{
        document.querySelector('#fileSelector').click()
    }

    const hanldeSave = ()=>{
        // console.log(active)
        dispatch( startSaveNote(active) )
    }

    const handleFileChange = (e)=>{
        const file = e.target.files[0]
        if (file){
            dispatch(startUpLoadin(file))
        }
    }

    return (
        <div className='notes__appbar'>
            <span>{dateMoment.format('dddd, MMMM Do YYYY')}</span>
            
            <input 
                id='fileSelector'
                type='file'
                name='file'
                style={ { display:'none' } }
                onChange={ handleFileChange }
            />


            <div>
                <button 
                    className='btn'
                    onClick={handlePictureClick}    
                >
                    Picture
                </button>
                <button 
                    onClick={hanldeSave}
                    className='btn'
                >
                    Save
                </button>
            </div>
        </div>
    )
}



















/*
Componente que renderiza el encabezado dentro del componente <NoteScreen/>

const {active} = useSelector( state => state.notes );    ==> extraer la nota activa

handlePictureClick  ==>simula el click en el input conel queryselector

handleFileChange  ==> recibe el evento y almacena la imagen en el e.target.files

*/

