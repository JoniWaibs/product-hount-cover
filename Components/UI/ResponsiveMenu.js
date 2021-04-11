import React from 'react'

export const ResponsiveMenu = () => {
    return (
        <div>
            <div className="my-10">
                
            </div>
            <div className="hidden lg:flex lg:flex-row items-center w-1/3">
                    <Link  href="/feed" >
                        <button className="px-3 py-2 bg-white rounded mx-1 hover:bg-gray-100 text-gray-500 hover:text-gray-800 font-semibold transition-all ease-in-out duration-300">
                            Feed
                        </button>
                    </Link> 
                    <Link  href="/popular" >
                        <button className="px-3 py-2 bg-white rounded mx-1 hover:bg-gray-100 text-gray-500 hover:text-gray-800 font-semibold transition-all ease-in-out duration-300">
                            Most popular
                        </button>
                    </Link>
                    <Link  href="/newproduct" >
                        <button className="px-3 py-2 bg-white rounded mx-1 hover:bg-gray-100 text-gray-500 hover:text-gray-800 font-semibold transition-all ease-in-out duration-300">
                            New Product
                        </button>
                    </Link>
            </div>
            <div className="my-5">
                
            </div>
        </div>
    )
}
