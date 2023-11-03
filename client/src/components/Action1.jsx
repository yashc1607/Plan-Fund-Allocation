import React from 'react'
import { Link } from 'react-router-dom'

export default function Action1() {
  return (
    <header className='bg-slate-300'>
        <div>
            <ul className='gap-2 flow-root'>
            <Link to='/'>
                <button className='hover:bg-white p-3'>Proposals</button>
            </Link>
            
            <Link to='/'>
                <button className='hover:bg-white p-3'>Quotations</button>
            </Link>
            
            <Link to='/Signin'>
                <button className='hover:bg-white p-3 float-right'>Logout</button>
            </Link>
            </ul>
        </div>
     </header>
  )
}
