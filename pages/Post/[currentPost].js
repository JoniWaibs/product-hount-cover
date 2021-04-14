import React, {useEffect, useState, useContext} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../Components/Layout'
import firebase ,{FirebaseContext} from '../../Firebase/index'
import Error from '../../Components/UI/404'
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Post = () => {

    const MySwal = withReactContent(Swal)
    const router = useRouter()
    const [ postInfo , setPostInfo ] = useState( {} )
    const [ comment, setComment ] = useState( {} )
    const [ error, setError ] = useState( false )
    const { instanceFirebase , currentUser } = useContext( FirebaseContext )
    const [ callToAPI , setCallToAPI ] = useState( true )

    useEffect(() => {
        if(router.query.currentPost && callToAPI){
            const isCallToAPI = async () => {
                const result = await instanceFirebase.getPost({ id: router.query.currentPost })
                const post = await result.get()
                const data = post.data()
                if(post.exists) setPostInfo( data ), setCallToAPI( false )
                else setError( true ), setCallToAPI( false )
            }
            isCallToAPI()
        }
    }, [router.query.currentPost])

    const handleVotes = async () =>{
        if(!currentUser) return document.getElementById('myModal').showModal()

        if(postInfo.votingUsers.includes( currentUser.uid )) return
        let votingUsers = [...postInfo.votingUsers , currentUser.uid ]

        let total = postInfo.votes + 1
        let payload ={ id: router.query.currentPost, totalVotes: total, voting: votingUsers }

        const result = await instanceFirebase.postVotes( payload )
        setPostInfo({
            ...postInfo,
            votes: total,
            votingUsers : votingUsers
        })
        setCallToAPI( true )
    }

    // const closeModal = () =>{ document.getElementById('myModal').close()}
    const  handleComment = e =>{
        setComment({
            ...comment,
            [e.target.name] : e.target.value
        })
    }

    const postComment = async e =>{
        e.preventDefault()
        if(!comment.message) return

        comment.id = currentUser.uid,
        comment.name = currentUser.displayName

        const currentComments = [...postInfo.comments, comment]
        let payload ={ id: router.query.currentPost, comments: currentComments }

        const result = await instanceFirebase.postComments( payload )
        setPostInfo({
            ...postInfo,
            comments: currentComments
        })

        document.getElementById('commentForm').reset()
        setCallToAPI( true )
    }

    const canDelete = () =>{
        if(!currentUser) return false
        if(currentUser.uid == postInfo.data_json.userId) return true
    }

    const deletePost = () =>{
        if(canDelete()){
            MySwal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const result = await instanceFirebase.deletePost({ id: router.query.currentPost })
                        MySwal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        return router.push('/') 
                    } catch (error) {
                        toast.error(error.message)
                    }
                }
            })
        }
        else return router.push('/') 

    }

    if(Object.keys(postInfo).length === 0 && !error) return <div class="loader">Loading...</div>

    return (
        <div className="bg-gray-100">
            <Layout>
                <>
                <ToastContainer style={{ width: "auto" }}/>
                    { error
                        ?
                            <Error data={'Sorry! Post does not exists'}/>
                        :
                            (
                                <>
                                <dialog id="myModal" className="h-96 w-11/12 md:w-1/2 p-5  bg-white rounded-md">
                                    <div className="flex flex-col w-full h-full items-center justify-center space-y-6">
                                        <div >
                                            <h4 className="inline-block my-1 font-bold text-2xl text-gray-800 text-center w-full">Sign up or Login to vote</h4>
                                            <p className="inline-block text-md text-gray-500 text-center w-full">Join our community of friendly folks discovering and sharing the latest products in tech.</p>
                                        </div>
                                        <div className="w-full flex flex-row items-center justify-center space-x-1">
                                            <Link href="/login">
                                                <button className="px-3 py-2 text-sm bg-white rounded mx-1 hover:bg-gray-100 text-gray-500 hover:text-gray-800 border font-semibold uppercase transition-all ease-in-out duration-300">
                                                    Login
                                                </button>
                                            </Link >
                                            <Link href="/signup">
                                                <button className="px-3 py-2 text-sm bg-red-600 rounded mx-1 hover:bg-red-500 text-gray-100 hover:text-gray-100 border font-semibold uppercase transition-all ease-in-out duration-300" >
                                                    Sign up
                                                </button>
                                            </Link >
                                        </div>
                                    </div>
                                </dialog>
                                <div className="flex items-center justify-between w-full mx-auto  sm:w-full md:w-11/12 lg:w-10/12 xl:w-10/12 sm:mt-10 md:mt-20" id="root">
                                    <div className="grid grid-cols-12 gap-4 w-full">
                                        <div className="col-span-12 lg:col-span-8 p-4">
                                            <h1 className="text-lg text-center lg:text-left font-bold lg:text-5xl text-gray-800 w-full">{postInfo.name}</h1>
                                        </div>
                                        <div className="col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-8 p-4 m-4 lg:m-0 space-y-6">
                                            <div className="w-full bg-white p-4 border border-gray-200 rounded-lg divide-y-2 divide-gray-200 space-y-2">
                                                <div className="w-auto flex items-center p-4">
                                                    {
                                                        postInfo.avatarURL
                                                        ?
                                                        <img src={postInfo.avatarURL} alt={postInfo.name} className=" h-96 inline-block mx-auto"/>
                                                        :
                                                        <img src='/static/img/noimage.jpeg' alt='No image available' className=" h-96 inline-block mx-auto"/>

                                                    }
                                                </div>
                                                <div className="h-auto">
                                                    <div className="h-20 flex flex-col items-start justify-center">
                                                        <h5 className="text-gray-500 text-sm tracking-wide w-full truncate leading-tight">{postInfo.description}</h5>
                                                    </div>
                                                    <div className="h-1/2 flex flex-col lg:flex-row justify-center items-center lg:items-end lg:justify-between space-y-5">
                                                        <div className="space-x-1">
                                                            <button className="inline-block px-2 py-2 border border-blue-500 text-blue-500 rounded text-xs font-bold uppercase tracking-wider">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-twitter inline-block mr-1" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="#3B82F6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                                                                </svg>
                                                                Twitter
                                                            </button>
                                                            <button className="inline-block px-2 py-2 border border-blue-800 text-blue-800 rounded text-xs font-bold uppercase tracking-wider">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook inline-block mr-1" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="#1E40AF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                                                                </svg>
                                                                Facebook
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <button className="inline-block px-2 py-1 border border-gray-300 text-gray-500 rounded text-xs font-normal uppercase tracking-wider">
                                                            <span>Featured </span>
                                                            <Moment fromNow>{postInfo.created_at}</Moment>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                currentUser &&(
                                                        <div className="w-full bg-white p-4 border border-gray-200 rounded-lg divide-y-2 divide-gray-200 space-y-2">
                                                            <div className="w-full">
                                                                <div className="flex flex-row items-center justify-start">
                                                                    <div>
                                                                        <p className="text-gray-800 font-bold text-sm">Would you recommend this product?</p>
                                                                    </div>
                                                                </div>
                                                                <form id="commentForm" onSubmit={postComment} className="w-full my-4 space-x-2 flex flex-row items-center">
                                                                    <div className="flex items-center">
                                                                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                        </svg>
                                                                        </span>
                                                                    </div>
                                                                    <div className="w-full inline-block">
                                                                        <input onChange={handleComment} name="message" type="text" className="w-full border border-gray-200 rounded px-2 h-10 focus:outline-none"/>
                                                                    </div>
                                                                    <div>
                                                                        <button type="submit" className="inline-block px-5 h-10 border bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider">send</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                            <div className="w-full bg-white p-4 border border-gray-200 rounded-lg divide-y-2 divide-gray-200 space-y-4">
                                                { postInfo.comments.length == 0 ? <p className="text-left text-gray-400">No comments yet</p> :
                                                    postInfo.comments.map(( comment, i )=>(
                                                        <div className="space-y-2" key={i}>
                                                            <div className="py-2">
                                                                <h1 className="text-gray-800 font-semibold inline-block capitalize">{comment.name}</h1>
                                                                <span className="px-2 bg-green-100 text-green-800 rounded-full text-sm inline-block ml-2">{comment.id == postInfo.data_json.userId ? 'Maker' : ''}</span>
                                                            </div>
                                                            <div className="text-gray-800 text-sm">
                                                                <p>{comment.message}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            {
                                                canDelete() &&
                                               (
                                                    <div>
                                                        <button onClick={ ()=>deletePost() } className="px-5 h-10 border bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className=" icon icon-tabler icon-tabler-trash w-5 h-5 currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <line x1="4" y1="7" x2="20" y2="7" />
                                                        <line x1="10" y1="11" x2="10" y2="17" />
                                                        <line x1="14" y1="11" x2="14" y2="17" />
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                        </svg>
                                                            <span>Delete project</span>
                                                        </button>
                                                    </div>
                                                )
                                            }

                                        </div>
                                        <div className="col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-4 p-4 m-4 lg:m-0 space-y-6">
                                            <div className="h-14 space-x-4 flex items-center" onClick={handleVotes} id="btn">
                                                <button className="rounded w-1/3 h-full inline-block border border-gray-200 bg-white text-lg text-gray-800 uppercase font-semibold">get it</button>
                                                <button className="rounded w-2/3 h-full inline-block bg-red-700 text-lg text-white uppercase font-semibold">
                                                    <div className="styles_icon__2kDip styles_orange__368qZ inline-block mr-2"></div>
                                                    upvote {postInfo.votes}
                                                </button>
                                            </div>
                                            <div className="space-x-4 flex items-center">
                                                <div className="mt-20 border border-gray-200 rounded bg-white w-full h-full p-4 flex flex-col items-start justify-between">
                                                    <div className="mb-3 w-full inline-block text-gray-500 text-xs uppercase">
                                                        <p>hunter</p>
                                                    </div>
                                                    <div className="flex flex-row items-center">
                                                        <div className="flex items-center">
                                                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                            </span>
                                                        </div>
                                                        {
                                                            postInfo.data_json ?
                                                            (
                                                                <div className="ml-2 flex flex-col">
                                                                <p className="text-md font-semibold text-gray-800 capitalize">{postInfo.data_json.userName}</p>
                                                                <p className="text-xs font-normal text-gray-500">
                                                                    Company:
                                                                    <span className="font-semibold"> {postInfo.company}</span>
                                                                </p>
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className="ml-2 flex flex-col">
                                                                <p className="text-md font-semibold text-gray-800">Unknow</p>
                                                                <p className="text-xs font-normal text-gray-500">
                                                                    Company:
                                                                    <span className="font-semibold">Unknow</span>
                                                                </p>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )
                        }
                </>
            </Layout>
        </div>
    )
}

export default Post
