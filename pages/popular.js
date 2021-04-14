import Layout from '../Components/Layout'
import React,{useContext, useEffect, useState} from 'react'
import { FirebaseContext } from '../Firebase/index'
import Posts from '../Components/UI/Post'


export default function Popular() {
  const [ posts , setPosts ] = useState( [] )
  const { instanceFirebase } = useContext( FirebaseContext )

  useEffect(()=>{
    const getMainContent = async () =>{
      const result = await instanceFirebase.getPosts( 'votes' )
      result.onSnapshot( handleSnapshot )
    }
    getMainContent()
  },[])

  const handleSnapshot = snapshot =>{
    const posts = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setPosts(posts)
  }



  return (
    <div className="bg-gray-100 h-screen">
      <Layout>
        <div className="flex items-center mx-auto justify-between w-full sm:w-full md:w-11/12 lg:w-10/12 xl:w-10/12 sm:mt-10 md:mt-20">
          <div className="w-full">
            <ul className="max-w-4xl divide-y divide-gray-200">
              {
                posts.map(post => (
                  <Posts post={post} key={post.id} />
                ))
              }
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}
