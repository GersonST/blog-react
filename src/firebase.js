import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


let firebaseConfig = {
    apiKey: "AIzaSyAWA8aq_WcubafK3L6GkGwBslz4Y0nMZ8E",
    authDomain: "blog-3cde8.firebaseapp.com",
    projectId: "blog-3cde8",
    storageBucket: "blog-3cde8.appspot.com",
    messagingSenderId: "726150834743",
    appId: "1:726150834743:web:b894cab3adf5085d2e6db2"
};

class Firebase{

  constructor(props){
    // Initialize Firebase
    app.initializeApp(firebaseConfig);

    this.app = app.database();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email,password)
  }

  async register(nome,email, password){
    await app.auth().createUserWithEmailAndPassword(email,password)

    const uid = app.auth().currentUser.uid;


      return app.database().ref('usuarios').child(uid).set({nome: nome})
  }

  isInitialized(){
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve);
    })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email;
  }

}


export default new Firebase();