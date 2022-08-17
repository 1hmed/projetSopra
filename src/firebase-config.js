import { initializeApp } from "firebase/app";
import { updateProfile,getAuth,createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword, signOut} from "firebase/auth";
import { useEffect, useState } from "react";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const auth =getAuth();
export function signup (email,password){
   return createUserWithEmailAndPassword(auth,email,password);
}

export function logout (){
  return signOut(auth);
}

export function adding(name){
  updateProfile(auth.currentUser,{
    displayName:name
    // ,photoURL:photo
  })
}

//custom hook
export function useAuth(){
    const [currentUser,setCurrentUser]= useState();
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])
    return currentUser;
}

export function login (email,password){
    return  signInWithEmailAndPassword(auth,email,password);
 }
 

