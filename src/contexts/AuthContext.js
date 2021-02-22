import React from 'react';
import {auth} from '../firebase'

const AuthContext = React.createContext();

export function useAuth(){
  return React.useContext(AuthContext);
}
export function AuthProvider({children}){
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(true)

  function signup(email, password){
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  } 

  function logout(){
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  React.useEffect(()=>{
    const unsubscribe  = auth.onAuthStateChanged((user) => {
      setLoading(false) 
      setCurrentUser(user)
    }) 
    return unsubscribe
  }, [ ])

  const value = {
    currentUser,
    login,
    logout,
    signup,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>  
  )

}

