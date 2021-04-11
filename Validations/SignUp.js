
// A - Recibe unas reglas del componente login
// B - retorna un objeto que dentro contendra errores si es que los hay, sino retornara un objeto vacio


export default function signupValidationRules( values ){

    //init errors
    let errors = {}

    //name errors
    if( !values.name ) errors.name = 'Name is required'
    //email errors
    if( !values.email ) errors.email = 'Email is required'
    else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) errors.email = 'Email not found'

    //password errors
    if( !values.password ) errors.password = 'Password is required'
    else if( values.password.length < 8 ) errors.password = 'Password must has 8 characters as minimum'

    return errors;

}