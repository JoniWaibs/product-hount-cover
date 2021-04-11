import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import useValidate from '../Hooks/useValidate'
import resetValidationRules from '../Validations/Reset'
import Errors from '../Components/UI/Errors'
import { ToastContainer, toast } from 'react-toastify';
// A - usevalidate es un custom hook, desde esta funcion le envio un state inicial que son los campos que mi formulario TimeRanges
// B - tambien le mando loginvalidaterules, que son las reglas de la validacion, ver fichero validatios/loginrules
// C - la funcion que se ejecutara si la validacion fue correcta, y el submit esta OK ,la funcion esta en este componente

//index of firebase ( context + class )
import instanceFirebase from '../Firebase'

const reset = () => {

    const [ loading , setLoading ] = useState( false )

    const INITIAL_STATE = {
        email: '',
    }
    const resetPassword = async () => {//Like mutation method in vue store

        setLoading( true )
        try {
            await instanceFirebase.sendEmailResetPassword( values )
            toast.success('We send an email, plear check your inbox')
        } catch (error) {
            toast.error(error.message)
        }
        setLoading( false )
        
    }
  
    const { values, errors, eventSubmit, handleChange, handleSubmit } = useValidate( INITIAL_STATE, resetValidationRules, resetPassword )

    const { email } = values

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <ToastContainer style={{ width: "auto" }}/> 
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl capitalize font-extrabold text-gray-900">¿Forgot Your Password?</h2>
                    </div>
                    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true"/>
                         
                        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-500 p-4 rounded" role="alert">
                            <p className="font-bold">Recover your password</p>
                            <p>Enter your email adress and we'll send you a link to reset your password.</p>
                        </div>
                        <div>
                            {errors.email ? <Errors errors={errors.email}/> : null} 
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">

                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input value={email} onChange={handleChange} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
                            </div>

                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex flex-row items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                { loading ?  <div className="loader"></div> : null }
                                <span  className="ml-2">Send Email</span>
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-row items-center justify-start">
                        <Link href="/login">
                            <button className="py-2 text-sm text-red-700 hover:text-gray-900 font-normal capitalize transition-all ease-in-out duration-500">
                                Go To Login
                            </button>
                        </Link >
                  </div>
                </div>
            </div>  
        </div>
    )

}

export default reset
