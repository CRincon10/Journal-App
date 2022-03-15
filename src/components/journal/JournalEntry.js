import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notesAction';

export const JournalEntry = ({id, title, body, imageUrl, date}) => {
    // console.log(id, title, body, imageUrl, date)
    
    const noteDate = moment(date)
    const dispatch = useDispatch();
    
    const handleEntryClick = ()=>{
        dispatch(activeNote(id,{
            title,body,imageUrl,date
        }))
    }


    return (
        <div className='journal__entry animate__animated animate__fadeIn animate__faster'
             onClick={handleEntryClick}
        >
             

            {
                imageUrl &&
                <div 
                className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${imageUrl})`,
                }}    
                >
                </div>
            }

            <div className='journal__entry-body'>
                <p 
                className='journal__entry-title'>
                    {title}
                </p>
                <p className='journal__entry-content'>
                    {body}
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>

        </div>
    )
}











/*
Componente dentro del <journalEntries/>/<Sidebar/>
Recibe como props todas las propiedades que tiene una note

handleEntryClick ==> dispara la accion activeNote de mis notesAction y le mando el id y como segundo argumento que es la nota le mando un objeto 
con las otras propiedades que estoy recibiendo como props en el componente princpial

de manera condicional va a mostrar la imagen dentro de cada nota es decir si la imageUrl tiene algo la muestra si no no la muestra
title y body vienen de las props y estan dentro de firebase

y para la date use libreria moment.js
npm install moment --save

el div con clase journal__entrey-picture su background es una imagen por eso la defino desde aca con la clase style que tiene sus
propiedades dentro de un objeto 





*/