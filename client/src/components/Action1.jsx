import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Action1() {
    const {currentUser} = useSelector(state=>state.user);
    
    //console.log(flag);
  return (
    <header className='bg-slate-300'>
        <div>
            <ul className='gap-2 flow-root'>
            
            {currentUser?(
                <>
                    
                    <Link to='/Faculty'>
                        <button className='hover:bg-white p-3'>Proposals</button>
                    </Link>
                    
                    <Link to='/ProgramCoordinator'>
                        <button className='hover:bg-white p-3'>Quotations</button>
                    </Link>
                    <Link to='/Profile'>
                        <button className='hover:bg-white p-3 float-right'>Profile</button>
                    </Link>
                    
                </>):
                (
                <>
                <Link to='/Signin'>
                    <button className='hover:bg-white p-3 float-right'>Sign In</button>
                </Link>
                </>
                
                )
            }
            
            </ul>
        </div>
     </header>

  )
}
