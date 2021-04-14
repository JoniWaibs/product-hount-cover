import React ,{ useState, useEffect } from 'react'
import instanceFirebase from '../Firebase/index'

const useAuth = () => {

    const [ userAuthorized , setUserAuthorized ] = useState(null);

    useEffect(()=>{

        const requestAutorization = instanceFirebase.auth.onAuthStateChanged( currentUser => {
            currentUser ? setUserAuthorized(currentUser) : setUserAuthorized(null) 
        })
        return () => requestAutorization()

    },[]);

    return userAuthorized;
}

export default useAuth
