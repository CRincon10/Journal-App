
import { useState } from "react"


export const useForm = (initialState={}) => {

    const [values, setValues] = useState(initialState)

    const reset = ( newFormState = initialState )=>{                     
        setValues(newFormState)
    }

    const handleInputChange = ({target})=>{

        setValues({
            ...values,
            [target.name]: target.value
        })  

    }
    return [values, handleInputChange, reset]

}




/*
En el reset recibo el nuevo estado del formulario que si no es enviado va a ser igual al initialState por defecto.
de esta manera cuando yo llame el reset puedo establecer los valores que yo quier a al formulario

*/