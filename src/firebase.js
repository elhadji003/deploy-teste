import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider ,signInWithPopup, FacebookAuthProvider } from "firebase/auth"
import { getStorage } from "@firebase/storage"



const firebaseConfig = {
  apiKey: "AIzaSyAM9ayv0bu9yN5XFrKLFMWcYo_bqPnzRZ4",
  authDomain: "my-app-13-a1036.firebaseapp.com",
  projectId: "my-app-13-a1036",
  storageBucket: "my-app-13-a1036.appspot.com",
  messagingSenderId: "181217214811",
  appId: "1:181217214811:web:c5dddf7db3bc6891719a7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)

const provider = new GoogleAuthProvider()
export const signInGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    alert('vous vous etes connecter avec succes')
  })
  .catch((error) => {
    console.log(error);
  })
}

// facebook
const provider1 = new FacebookAuthProvider();
export const signInFacebook = () => {
  signInWithPopup(auth, provider1)
    .then((result) => {
      console.log(result);
      alert('Vous vous êtes connecté avec succès');
      // Ajouter la redirection vers la nouvelle page
    })
    .catch((error) => {
      console.error(error);
    });
}




