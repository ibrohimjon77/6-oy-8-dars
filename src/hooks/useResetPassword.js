import {auth} from '../firebase/config'
import {fromError} from '../components/ErrorId'
import { sendPasswordResetEmail } from 'firebase/auth'

export const useResetPassword = ()=>{
    const resetPassword =async (email) =>{
        try{
            await sendPasswordResetEmail(auth, email, {
                url:"http://localhost:5173/",
            });
            alert("Check your email")
        }catch (error){
            const errorMessage=error.message;
            fromError(errorMessage);
        }
    }
    return {resetPassword}
}