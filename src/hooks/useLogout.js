import React, {  useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { getFirebaseErrorMessage } from '../components/ErrorId'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../app/feature/userSlice'
import { doc, updateDoc } from "firebase/firestore";

function useLogout() {
    const dispatch = useDispatch()
    const [isPending,setIsPending] = useState(false)
    const [error,setError] =useState(null)
    const {user} =useSelector((store)=>store.user)
   
 const _logout= async ()=>{
    try{
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, { 
       online:false,
      });
      await signOut(auth);
      dispatch(logout());
    }
    catch (error){
        setError(getFirebaseErrorMessage( error.message));
        console.log(error.message);
           }
           finally{
        setIsPending(false)
        }}

 return {_logout, isPending, error}
}

export default useLogout
