import React,{useState, useEffect} from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Button from './components/Button';
import Channel from './components/Channel';

firebase.initializeApp({
    apiKey: "AIzaSyDiclGBrhQ0jrmT1uU7WDR3RvOdTfA8Olg",
    authDomain: "enabledchat.firebaseapp.com",
    projectId: "enabledchat",
    storageBucket: "enabledchat.appspot.com",
    messagingSenderId: "300699778552",
    appId: "1:300699778552:web:323fb2f4eed2cbd3bb6a0d"
  
});
const auth = firebase.auth();
const db = firebase.firestore();
function App() {
  const [user,setUser] = useState(() => auth.currentUser);
  const [initializing,setInitializing]= useState(true);
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }
      if(initializing){
        setInitializing(false);
      }
    });
    return unsubscribe;

  },[])
  const signInWithGoogle = async () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try{
      await auth.signInWithPopup(provider);

    }
    catch(error){
      console.log(error);
    }
  };

  const signout = async() =>{
    try{
      await firebase.auth().signOut();
    }catch(error){
      console.log(error.message);
    }
  };
  if(initializing) return "Loading...";
  return (
    <div>
      {user ? (
        <>
        <Button onClick={signout}>Sign out</Button>
        <Channel user={user} db={db}/>
        <p>'Welcome to the chat'</p>

        </>
      ):(
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      )}
    </div>
  );
}

export default App;
