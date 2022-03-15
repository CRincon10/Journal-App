import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/authActions';
import { JournalEntries } from './JournalEntries'
import { startNewNote } from '../../actions/notesAction'



export const Sidebar = () => {

    const dispatch = useDispatch();
    const {name} = useSelector( state => state.auth );
    
    const handleAddNew = ()=>{
        dispatch(startNewNote())
    }
    
    const handleLogout = ()=>{
        dispatch(startLogout())
    }
    
    return (
        <aside className='journal__sidebar'>
            
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-5'>
                    <i className='far fa-moon'></i>
                    <span> {name}</span>
                </h3>

                <button 
                    className='btn'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>    

            {/*div con funcion de boton que envia la nueva entrada al firestore*/}
            <div      
                className='journal__new-entrey'
                onClick={handleAddNew}
            >
                <i className='far fa-calendar-plus fa-5x'></i>
                <p className='mt-5'>New Entry</p>

            </div>

            <JournalEntries />

        </aside>
    )
}







/*
El useSelector()    ==> retorna el state de mi aplicacion en el punto donde se mande a llamar

handleAddNew ==>  Funcion que envia la estrada al firestore

*/