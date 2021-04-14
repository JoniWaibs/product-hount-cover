import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { FirebaseContext } from '../../Firebase/index'
import Router from 'next/router'
import {DebounceInput} from 'react-debounce-input';





const Header = () => {
    const [ filterKeyword , setFilterKeyword ] = useState('')
    const [ isFilter , setIsFilter ] = useState( false )
    const { instanceFirebase, currentUser } = useContext( FirebaseContext )


    useEffect(()=>{
        const startFilter = e =>{
            if(filterKeyword.trim() != ''){
                setIsFilter( true )
                Router.push({
                    pathname:'/',
                    query: {q : filterKeyword}
                })
            }
            // if(filterKeyword == ''){
            //     Router.push({})
            // }
        }
        startFilter()

    },[filterKeyword, isFilter])


    return (

        <nav className="bg-white py-6 border-b border-gray-200 shadow-sm">
            <div className="flex items-center mx-auto justify-between w-full sm:w-full md:w-11/12 lg:w-10/12 xl:w-10/12 h-10">
                <div className="flex flex-row items-center w-full px-6 lg:px-0 lg:w-1/3">
                    <Link href="/">
                        <a className="mr-2">
                            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd"><path d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20" fill="#DA552F"></path><path d="M22.667 20H17v-6h5.667a3 3 0 010 6m0-10H13v20h4v-6h5.667a7 7 0 100-14" fill="#FFF"></path></g></svg>
                        </a>
                    </Link >
                    <div className="flex items-center border rounded w-full h-10">
                        <DebounceInput
                            className="w-full h-full rounded px-2 focus:outline-none"
                            placeholder="Discover your next favourite thing..."
                            minLength={0}
                            debounceTimeout={700}
                            onChange={e => setFilterKeyword(e.target.value)} />
                        <svg  xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search font-semibold text-gray-400 mx-2" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="10" cy="10" r="7" />
                        <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>

                    </div>
                </div>
                <div className="hidden lg:flex lg:flex-row items-center w-1/3">
                    <Link href="/" >
                        <a className="px-3 py-2 bg-white rounded mx-1 hover:bg-gray-100 text-gray-500 hover:text-gray-800 font-semibold transition-all ease-in-out duration-300">
                            Feed
                        </a>
                    </Link>
                    <Link  href="/popular" >
                        <a className="px-3 py-2 bg-white rounded mx-1 hover:bg-gray-100 text-gray-500 hover:text-gray-800 font-semibold transition-all ease-in-out duration-300">
                            Most popular
                        </a>
                    </Link>
                    { currentUser
                        ?
                        <>
                            <Link  href="/newproduct" >
                                <a className="px-3 py-2 bg-white rounded mx-1 hover:bg-gray-100 text-gray-500 hover:text-gray-800 font-semibold transition-all ease-in-out duration-300">
                                    New Product
                                </a>
                            </Link>
                        </>
                        :
                        null
                    }
                </div>
                <div className="hidden lg:flex lg:flex-row items-center w-1/3 justify-end">
                    { currentUser
                        ?
                        <>
                            <p className="text-gray-500 font-light mr-2">Hello, <span className="font-semibold capitalize">{currentUser.displayName}</span></p>
                            <Link href="#">
                                <a onClick={() => instanceFirebase.LogOut()}  className="px-3 py-2 text-sm bg-white rounded mx-1 hover:bg-gray-100 text-gray-500 hover:text-gray-800 border font-semibold uppercase transition-all ease-in-out duration-300">
                                    Logout
                                </a>
                            </Link >
                        </>
                        :
                        <>
                            <Link href="/login">
                                <a className="px-3 py-2 text-sm bg-white rounded mx-1 hover:bg-gray-100 text-gray-500 hover:text-gray-800 border font-semibold uppercase transition-all ease-in-out duration-300">
                                    Login
                                </a>
                            </Link >
                            <Link href="/signup">
                                <a className="px-3 py-2 text-sm bg-red-600 rounded mx-1 hover:bg-red-500 text-gray-100 hover:text-gray-100 border font-semibold uppercase transition-all ease-in-out duration-300" >
                                    Sign up
                                </a>
                            </Link >
                        </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Header
