import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserFailure, signOutUserSuccess, signOutUserStart } from '../redux/user/userSlice';

export default function profile() {
  const {currentUser}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  //console.log(user);
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  
  return (
    <div className='p-3 max-w-lg mx-auto flex flex-col gap-4'>
      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input type='text' defaultValue={currentUser.name} placeholder='name' id='name' className='border p-3 rounded-lg'/>
        <input type='email' defaultValue={currentUser.email} placeholder='email' id='email' className='border p-3 rounded-lg'/>
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-80'>UPDATE</button>
      </form>
      <div className='flex flex-col gap-4'>
        <button onClick={handleSignOut} className='bg-red-700 text-white rounded-lg p-3 hover:opacity-90 gap-4 '>Sign Out</button>
      </div>
    </div>
  )
}
