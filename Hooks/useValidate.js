import React , { useState , useEffect } from 'react'

// A - Recibe el initial state que es el objeto vacio que tengo creado en el componente login.
// B - REcibe el objeto validate que son las reglas de validacion, ahora estan viniendo vacias porque las estoy usando
// C - recibo la funcioon que se ejecutara una vez que el submit este OK


// D - handlechange va reemplazando el state con los datos que se ingresan en los campos del form 
// E - handlesubmit previene, luego validateErrors envia los errores a las reglas de validacio y esta le retorna vacio o errores,
// F - si hay errores los guarda en el state de errores y vuelve el submit a falso


// G - El useEffect esta pendiende de si en algun momento caen errores, si caern errores hace algo, si no cen errores ejecuta la funcion del submit OK y avanza

const useValidate = ( initialState , validate , fn ) => {

    const [ values , setValues ] = useState( initialState )
    const [ errors , setErrors ] = useState({})
    const [ eventSubmit , setEventSubmit ] = useState( false )

    useEffect(()=>{
        //when user clicked at submit button
        if( eventSubmit ){
            const noErrors = Object.keys(errors).length === 0
            if( noErrors ) fn()
        }
        
        setEventSubmit( false )
    },[errors])

    //save input values at state
    const handleChange = e => setValues({ ...values , [e.target.name] : e.target.value })
    
    //with event submit, prevent default, save errors at state
    const handleSubmit = e => {
        e.preventDefault()
        const validateErrors = validate( values )
        setErrors( validateErrors )
        setEventSubmit( true )
    }

    return{
        values,
        errors,
        eventSubmit,
        handleChange,
        handleSubmit
    }

}

export default useValidate

