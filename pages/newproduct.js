import React, { useState, useContext,useEffect } from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import useValidate from '../Hooks/useValidate'
import newProductValidationRules from '../Validations/NewProduct'
import Errors from '../Components/UI/Errors'
import { ToastContainer, toast } from 'react-toastify';
// A - usevalidate es un custom hook, desde esta funcion le envio un state inicial que son los campos que mi formulario TimeRanges
// B - tambien le mando loginvalidaterules, que son las reglas de la validacion, ver fichero validatios/loginrules
// C - la funcion que se ejecutara si la validacion fue correcta, y el submit esta OK ,la funcion esta en este componente

//index of firebase ( context + class )
import { FirebaseContext } from '../Firebase/index'
import Layout from '../Components/Layout'
import FileUploader from "react-firebase-file-uploader";

export default function NewProduct() {



  const [ loading , setLoading ] = useState( false )
  const { instanceFirebase, currentUser } = useContext( FirebaseContext )
  const [ avatar , setAvatar ] = useState( '' )
  const [ avatarURL , setAvatarURL] = useState( '' )
  const [ isUploading , setUploading ] = useState( false )
  const [ progress , setProgress ] = useState( 0 )

  useEffect(()=>{
    if(!currentUser){
      return Router.push('/login')
    }
  },[currentUser])

  let INITIAL_STATE = {
      name: '',
      company: '',
      url: '',
      description: '',
  }
  const handleUploadStart = () => {
    setProgress( 0 )
    setUploading( true )
  }
  const handleProgress = progress => setProgress({ progress })
  const handleUploadError = error => {
    setUploading( false )
    toast.error( error )
  }

  const handleUploadSuccess = filename => {

    setProgress( 0 )
    setUploading( false )
    setAvatar( filename )
    instanceFirebase
      .storage
      .ref("Products")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        setAvatarURL( url )
      });


  }
  const setNewProduct = async () => {//Like mutation method in vue store

    if(!currentUser){
      return Router.push('/login')
    }
    setLoading( true )

    const isNewPRoduct = {
      name,
      company,
      avatarURL,
      url,
      description,
      votes: 0,
      comments: [],
      created_at : Date.now(),
      data_json:{
        userName: currentUser.displayName,
        userId: currentUser.uid
      },
      votingUsers:[]
    }

    try {
      const result = await instanceFirebase.createNewProduct( isNewPRoduct )
      if( result ) return Router.push('/')
    } catch (error) {
      toast.error(error.message)
    }
    setLoading( false )
  }

  const { values, errors, eventSubmit, handleChange, handleSubmit } = useValidate( INITIAL_STATE, newProductValidationRules, setNewProduct )

  const { name, company, url, description } = values


  return (
    <Layout>
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <ToastContainer style={{ width: "auto" }}/>
            <div className="max-w-xl w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Upload New Product</h2>
                </div>
                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true"/>
                    <div className="rounded-md shadow-sm space-y-6">

                      <fieldset className="border border-dashed border-gray-300 p-4 rounded space-y-6">
                        <legend>General Information</legend>
                        <div>
                          <label htmlFor="name" className="sr-only">Name</label>
                          <input value={name} onChange={handleChange} id="name" name="name" type="text" autoComplete="name" required className="mb-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="Name"/>
                          {errors.name ? <Errors errors={errors.name}/> : null}
                        </div>
                        <div>
                          <label htmlFor="company" className="sr-only">Company</label>
                          <input value={company} onChange={handleChange} id="company" name="company" type="text" autoComplete="Company" required className="mb-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="Company"/>
                          {errors.company ? <Errors errors={errors.company}/> : null}
                        </div>

                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-700">
                                <span>Upload a file</span>
                                <FileUploader
                                  accept="image/*"
                                  randomizeFilename
                                  storageRef={instanceFirebase.storage.ref("Products")}
                                  onUploadStart={handleUploadStart}
                                  onUploadError={handleUploadError}
                                  onUploadSuccess={handleUploadSuccess}
                                  onProgress={handleProgress}
                                  id="image"
                                  name="image"
                                  type="file"
                                  className="sr-only"
                                  />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="url" className="sr-only">Url</label>
                          <input value={url} onChange={handleChange} id="url" name="url" type="url" autoComplete="url" required className="mb-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="URL"/>
                          {errors.url ? <Errors errors={errors.url}/> : null}
                        </div>
                      </fieldset>

                      <fieldset className="border border-dashed border-gray-300 p-4 rounded">
                        <legend>About your product</legend>
                        <div>
                          {errors.description ? <Errors errors={errors.description}/> : null}
                          <label htmlFor="description" className="sr-only">Description</label>
                          <textarea value={description} onChange={handleChange} id="description" name="description" type="text" autoComplete="current-password" required className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="Product Description">
                          </textarea>
                        </div>
                      </fieldset>

                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex flex-row items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            { loading ?  <div className="loader"></div> : null }
                            <span  className="ml-2">Post</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}