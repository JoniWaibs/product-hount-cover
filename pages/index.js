import Layout from '../Components/Layout'
import React,{useContext, useEffect, useState} from 'react'
import { FirebaseContext } from '../Firebase'
import Posts from '../Components/UI/Post'
import { useRouter } from 'next/router'
import Error from '../Components/UI/404'


export default function Home() {
  const [ posts , setPosts ] = useState( [] )
  const [ isFilter , setIsFilter ] = useState( false )
  const { instanceFirebase } = useContext( FirebaseContext )
  const router =  useRouter()
  const{query: {q}} = router

  useEffect(()=>{
    if(q){
      setIsFilter( true )
      const resultFilter = posts.filter( res => {
        return(
          res.name.toLocaleLowerCase().includes(q.toLocaleLowerCase()) ||
          res.description.toLocaleLowerCase().includes(q.toLocaleLowerCase())
        )
      })
      setPosts(resultFilter)
    }
    else getMainContent(), setIsFilter( false )

  },[q])

  const getMainContent = async () =>{
    const result = await instanceFirebase.getPosts( 'created_at' )
    result.onSnapshot( handleSnapshot )
  }

  const handleSnapshot = snapshot =>{
    const posts = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setPosts(posts)
  }

  if(Object.keys(posts).length == 0 && !isFilter) return <div className="loader">Loading...</div>

  return (
    <div className="bg-gray-100 h-screen">
      <Layout>
        <div className="flex items-center mx-auto justify-between w-full sm:w-full md:w-11/12 lg:w-10/12 xl:w-10/12 sm:mt-10 md:mt-20">
          <div className="w-full">
          
            <ul className="max-w-4xl divide-y divide-gray-200">
              {
                posts.length
                ?
                (
                  posts.map(post => (
                    <Posts post={post} key={post.id} />
                  ))
                )
                :
                <Error data={'Sorry! We did not find any post'}/>
              }
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}
