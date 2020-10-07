import { useState } from "react"

export const useForm = ( inicialState = {} ) => {
    
    const [values, setValues] = useState( inicialState )

    const cleanInput = ( newFromState = inicialState) => {
        setValues( newFromState )
    }

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value

        })
    }

    return [ values, handleInputChange, cleanInput ]

}