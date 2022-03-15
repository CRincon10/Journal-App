import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/authActions'
import { useForm } from '../../hooks/useForm'



export const LoginScreen = () => {
    
    const dispatch = useDispatch()
    const state = useSelector( state => state.ui );
    const {loading} = state
    // console.log(loading)


    const [formValues, handleInputChange] = useForm({
        // email: 'luciana@gmail.com',
        // password: '12341234',
    })
    
    const {email,password} = formValues

    const handleLogin = (e)=>{
        e.preventDefault()        
        dispatch( startLoginEmailPassword(email,password))
    }

    // const ifFormValid = ()=>{
        
        
    // }


    const handleGooglelogin = ()=>{

        dispatch(startGoogleLogin())

    }

    

    return (
        <div >
            <h3 className='auth__title'>Login</h3>
            <form 
                onSubmit={handleLogin}
                className='animate__animated animate__fadeIn animate__faster'    
            >
                <input
                    type='text'
                    placeholder='email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    
                    onChange= {handleInputChange}

                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange= {handleInputChange}

                />
                <button 
                    type='submit'
                    className='btn btn-primary btn-block'
                    onClick={handleLogin}
                    disabled={loading}
                    
                >
                    Login
                </button>
                 
                <div className='auth__social-network'>
                    <p>Login with social networks</p>
                    <div className="google-btn"
                        onClick={handleGooglelogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link 
                    to="/auth/register" 
                    className='link'
                 >
                    Create new account
                </Link>

            </form>

        </div>
    )
}




/*dispatch proporcionado por redux, es necesario configurar el snipet.
startLoginEmailPassword ==> Es mi middelwere que transforma las peticiones async en sincronas definido en <authActions/>

useSelector() => me retorna el state de mi aplicacion en este caso el ui definido en el <uiReducer/>


*/

