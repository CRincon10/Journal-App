import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'

import { useForm } from '../../hooks/useForm'
import { removeErrorAction, setErrorAction } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/authActions'

export const RegisterScreen = () => {
    
    const dispatch = useDispatch()

    const state = useSelector( state => state.ui)
    const {msgError} = state

    

    const [ formValues, handleInputChange ] = useForm({
        // name: 'Luciana',
        // email: 'luciana@gmail.com',
        // password: '12341234',
        // password2: '12341234'
    })

    const {name,email,password,password2} = formValues

    const handleRegister = (e)=>{
        e.preventDefault()
        
        if (ifFormValid()){
            
            dispatch(startRegisterWithEmailPasswordName(name,email,password))
        }

    }

    const ifFormValid = ()=>{

        if (name.trim().length === 1){
            dispatch(setErrorAction('Name is required'))
            return false
        }else if( !validator.isEmail(email)){
            dispatch(setErrorAction('Email is not valid '))
            return false
        }else if( password !== password2 || password.length <5 ){
            dispatch(setErrorAction('password should be at least 6 characters and match each other'))
            return false
        }

        dispatch(removeErrorAction())
        return true

    }

    return (
        <div >
            <h3 className='auth__title'>Register</h3>
            
            <form 
                onSubmit={handleRegister}
                className='animate__animated animate__fadeIn animate__faster'    
            >

                {
                    msgError &&
                    (
                        <div className='auth__alert-error'>
                            {msgError}
                        </div>
                    )

                }
      
                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={name}
                    onChange={ handleInputChange }
                />
                <input
                    type='text'
                    placeholder='email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={ handleInputChange }
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange={ handleInputChange }
                />
                <input
                    type='password'
                    placeholder='Confirm-Password'
                    name='password2'
                    className='auth__input'
                    value={password2}
                    onChange={ handleInputChange }
                />
                <button 
                    type='submit'
                    className='btn btn-primary btn-block mb-5 mt-1'
                    onClick={ handleRegister }
                >
                    Register
                </button>
                
                
                <Link 
                    to="/auth/login" 
                    className='link'
                >
                    already registered?
                </Link>
                
            </form>

        </div>
    )
}









/*
libreria para validar los campos inputs del formulario
npm install validator

useDispatch()    ==> aportado por redux. para disparar acciones declaradas en el ui.js

useSelector()     ==> dispara un call back que contiene el state como esta definido en el componente <uiReducer/>, el estado inicial tiene el msgError en null
es por eso que de manera condicional puedo mostrar el dispatch(setErrorAction) en caso de que haya cuando msgError sea diferente a null
 {
    msgError &&
    (
        <div className='auth__alert-error'>
            {msgError}
        </div>
    )

}v

startRegisterWithEmailPasswordName  ==> Action que se dispara si el formulairo esta correcto y envia el name, email, password que recibe del formulario a authActions.js


ifFormValid      ==>condicion para validar si el formulario es valido usa el dispatch para llamar las actions del ui.js

*/