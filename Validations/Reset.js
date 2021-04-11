
// A - Recibe unas reglas del componente login
// B - retorna un objeto que dentro contendra errores si es que los hay, sino retornara un objeto vacio


export default function resetValidationRules( values ){

    //init errors
    let errors = {}

    //email errors
    if( !values.email ) errors.email = 'Email is required'
    else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) errors.email = 'Email not found'

    return errors;

}