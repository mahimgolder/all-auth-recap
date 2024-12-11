import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import './App.css'
import { app } from './firebase/firebaseInfo'
import { useState } from 'react';

function App() {
  const auth = getAuth(app);
  // google authProvider
  const googleProvider = new GoogleAuthProvider();
  // github authProvider
  const githubProvider = new GithubAuthProvider();
  const [user, setUser] = useState(null)
    // google authentication func
  const handleSignGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      setUser(result.user);
    }).catch((error) => {
      console.log("GOOGLE ERROR", error);
    })
  }
  // github authentication func
  const handleSigninGithub = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      setUser(result.user);
    }).catch(error => {
      console.log("GIT ERROR ", error);
    })
  }
  // logOut func
  const handleLogOut = () => {
    signOut(auth)
    .then(() => {
      setUser('')
      console.log(user)
    })
  }

  return (
    <div>
      {
        user ? <button onClick={handleLogOut}>Logout</button> : "" 
      }
      <h1>Well come to our webpage.</h1>
      {
        user && <div>
          <img src={user.photoURL} alt="profile" />
          <h3>{user.displayName}</h3>
          <h4>{user.email}</h4>
        </div>
      }
      {
        user ? "" : <>
        <button onClick={handleSignGoogle}>Signin with google</button>
        <button onClick={handleSigninGithub}>Signin with github</button>
        </>
      }
    </div>
  )
}

export default App
