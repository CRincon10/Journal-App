import React from 'react'

export const JournalEntry = () => {
    return (
        <div className='journal__entry'>
            <div 
                className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdzHToXNWSIwxP1tytE8H5rPjNYxrv1FdI-g&usqp=CAU)'
                }}    
            >
            </div>

            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    A new day
                </p>
                <p className='journal__entry-content'>
                    Occaecat deserunt velit quis commodo sint proident amet.
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>Thursday</span>
                <h4>3</h4>
            </div>

        </div>
    )
}











/*
el div con clase journal__entrey-picture su background es una imagen por eso la defino desde aca con la clase style quetiene sus
propiedades dentro de un objeto 


*/