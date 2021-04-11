import app from 'firebase/app'
import firebaseConfig from './Config'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

//methods for user, like controller in MVC or Services in Vue js
class Firebase{

    constructor(){

        !app.apps.length ? app.initializeApp( firebaseConfig ) : null
        this.auth = app.auth()
        this.db = app.firestore()
        this.storage = app.storage()

    }
    async SignUp( user ){

        const { email, password, name } = user
        const result = await this.auth.createUserWithEmailAndPassword( email, password )
        return await result.user.updateProfile({ displayName: name })

    };
    async Login( user ){

        const { email, password } = user
        return await this.auth.signInWithEmailAndPassword( email, password )

    }
    LogOut(){
       return this.auth.signOut()
    }
    async sendEmailResetPassword( payload ){
        const { email } = payload
        return await this.auth.sendPasswordResetEmail( email )
    }
    async createNewProduct( payload ){
        return await this.db.collection('Products').add( payload )
    }
    async getPosts( order ){
        console.log('posts')
        return await this.db.collection('Products').orderBy( order, 'desc')
    }
    async getPost( payload ){
        console.log('post')
        const { id } = payload
        return await this.db.collection('Products').doc( id )
    }
    async postVotes( payload ){
        const { id, totalVotes, voting } = payload
        return await this.db.collection('Products').doc( id ).update({ votes:totalVotes , votingUsers:voting })
    }
    async postComments( payload ){
        const { id , comments } = payload
        return await this.db.collection('Products').doc( id ).update({ comments: comments })
    }
    async deletePost( payload ){
        const { id } = payload
        return await this.db.collection('Products').doc( id ).delete()
    }

};

const instanceFirebase = new Firebase();
export default instanceFirebase;