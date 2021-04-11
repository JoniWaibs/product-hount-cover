import React from 'react'
import Moment from 'react-moment';
import Link from 'next/link'


const Post = ({ post }) => {

    return (
        <li>
            <div className="bg-white  flex flex-row items-center justify-between py-6 px-6 hover:bg-gray-50 cursor-pointer">
                <div className="w-5/6 flex">
                    <div className="">
                        {
                            post.avatarURL
                            ?
                            <img alt={post.name} className="bg-cover bg-center w-36 h-24" src={post.avatarURL} />
                            :
                            <img alt='No image Available' className="bg-cover bg-center w-36 h-24" src='/static/img/noimage.jpeg' />

                        }
                    </div>
                    <div className="ml-2 w-full flex flex-col items-start justify-between px-2">
                        <Link href={{
                            pathname: '/Post/[currentPost]',
                            query: { currentPost: post.id} 
                            }}
                            passHref
                            >
                            <a className="text-gray-600 font-semibold text-lg w-full">{post.name}</a>
                        </Link>
                        <div className="w-full">
                            <p className="text-gray-500 font-normal text-sm">{post.description}</p>
                        </div>
                        <div className="flex flex-row items-center w-full">
                            <div className="rounded hover:bg-gray-100 border border-gray-200 flex flex-row items-center justify-center px-2 mr-2">
                                <div className="mr-1 tracking-wide">
                                    <svg width="12" height="14" viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                                    <path d="M2.012 7.832C1.21 7.052.727 6.045.727 4.946c0-2.48 2.463-4.491 5.5-4.491 3.038 0 5.5 2.01 5.5 4.491 0 2.48-2.462 4.492-5.5 4.492a6.562 6.562 0 01-2.13-.35c-1.07.62-3.166 1.44-3.166 1.44s.7-1.685 1.081-2.696z" fill="currentColor" fillRule="evenodd"></path></svg>
                                </div>
                                <div>
                                    <span className="text-gray-500 font-semibold text-sm">{post.comments.length}</span>
                                </div>
                            </div>
                            <div className="text-gray-500 text-xs">
                                <span>Created at </span>
                                <Moment fromNow>{post.created_at}</Moment>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/6 flex justify-end">
                    <button className="rounded border-gray-200 border hover:bg-gray-100 h-24 w-20 flex flex-col items-center justify-center">
                        <div className="styles_icon__2kDip styles_blackOrange__2IgdZ"></div>
                        <p className="text-gray-800 font-semibold text-md">{post.votes}</p>
                    </button>
                </div>
            </div>
        </li>
    )
}

export default Post
