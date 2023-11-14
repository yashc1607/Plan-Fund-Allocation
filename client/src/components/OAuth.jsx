import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick=async()=>{
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result = await signInWithPopup(auth,provider);

            if (result.user.email.endsWith('@nitc.ac.in')) {
              const res=await fetch('/api/auth/google',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: result.user.displayName, 
                  email: result.user.email,
                  photo: result.user.photoURL,
                  usertype:'department',
                }),
              });
              const data= await res.json()
              dispatch(signInSuccess(data));
              navigate('/Faculty');
            }else {
              // Set an error message if the email address is not valid
              setErrorMessage('Email address does not end with @nitc.ac.in');
              console.log('Email address does not end with @nitc.ac.in');
            }
        }
        catch(error){
            console.log('could not sign in with google',error);
        }
    };
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90'>Continue with google</button>
  )
}
