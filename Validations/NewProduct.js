
// A - Recibe unas reglas del componente login
// B - retorna un objeto que dentro contendra errores si es que los hay, sino retornara un objeto vacio


export default function signupValidationRules( values ){

    //init errors
    let errors = {}

    //name errors
    if( !values.name ) errors.name = 'Name is required'
    //company errors
    if( !values.company ) errors.company = 'company is required'
    
    //url errors
    if( !values.url ) errors.url = 'url is required'
    else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ) errors.url = 'URL not found'

    //company errors
    if( !values.description ) errors.description = 'Description is required'

    return errors;

}