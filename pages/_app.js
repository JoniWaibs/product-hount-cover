import '../styles/globals.css'
import "tailwindcss/tailwind.css";

//css toast
import 'react-toastify/dist/ReactToastify.css';
//Firebase imported at /Firebase/index.js
import instanceFirebase , { FirebaseContext } from '../Firebase'
//firebase hook for serch currentUser
import useAuth from '../Hooks/useAuth'



function MyApp({ Component, pageProps }) {

  const currentUser = useAuth()

  return <FirebaseContext.Provider
    value={{
      instanceFirebase,
      currentUser,
    }}
    >
    <Component {...pageProps} />
  </FirebaseContext.Provider>

}

export default MyApp
