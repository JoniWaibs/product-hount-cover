import React from 'react'
import Header from '../Components/UI/Header'
import Head from 'next/head'

const Layout = props => {
    return (
        <>
            <Head>
               <title>Product Hount</title> 
            </Head>
            <Header/>
            <main>
                { props.children }
            </main>
        </>
    )
}

export default Layout
