import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import useValidate from '../Hooks/useValidate'
import loginValidationRules from '../Validations/Login'
import Errors from '../Components/UI/Errors'
import { ToastContainer, toast } from 'react-toastify';
// A - usevalidate es un custom hook, desde esta funcion le envio un state inicial que son los campos que mi formulario TimeRanges
// B - tambien le mando loginvalidaterules, que son las reglas de la validacion, ver fichero validatios/loginrules
// C - la funcion que se ejecutara si la validacion fue correcta, y el submit esta OK ,la funcion esta en este componente

//index of firebase ( context + class )
import instanceFirebase from '../Firebase'


const login = () => {

  const [ loading , setLoading ] = useState( false )

  const INITIAL_STATE = {
      email: '',
      password : ''
  }
  const loginAccount = async () => {//Like mutation method in vue store
    
    setLoading( true )
    try {
      await instanceFirebase.Login( values )
      Router.push('/')
    } catch (error) {
      toast.error(error.message)
    }
    setLoading( false )
      
  }

  const { values, errors, eventSubmit, handleChange, handleSubmit } = useValidate( INITIAL_STATE, loginValidationRules, loginAccount )

  const { email, password } = values

  return (
      <div>
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
              <ToastContainer style={{ width: "auto" }}/> 
              <div className="max-w-md w-full space-y-8">
                  <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                  </div>
                  <div>
                    {errors.email ? <Errors errors={errors.email}/> : null}
                    {errors.password ? <Errors errors={errors.password}/> : null} 
                  </div>
                  <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">

                      <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input value={email} onChange={handleChange} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
                      </div>
                    
                      <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                      </div>
                    
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex flex-row items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          { loading ?  <div className="loader"></div> : null }
                          <span  className="ml-2">Sign In</span>
                        </button>
                    </div>
                  </form>
                  <div className="flex flex-row items-center justify-between">
                    <Link href="/signup">
                      <button className="py-2 text-sm text-red-700 hover:text-gray-900 font-normal capitalize transition-all ease-in-out duration-500">
                        Create Free Account
                      </button>
                    </Link >
                    <Link href="/reset">
                      <button className="py-2 text-sm text-red-700 hover:text-gray-900 font-normal capitalize transition-all ease-in-out duration-500" >
                        Forgot your Password ?
                      </button>
                    </Link>
                  </div>
              </div>
          </div>  
      </div>
  )

}

export default login
