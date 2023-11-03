import React from 'react'
import { Link } from 'react-router-dom'

export default function header() {
  return (
    <header className='bg-slate-200'>
        <div className='mx-auto p-3 flex justify-center '>
            <h1 className=' font-bold text-ellipsis '> 
                <Link to='/'>
                  <div className='text-slate-500 text-2xl'>Plan Fund Allocation</div>
                </Link>
                <div className='text-slate-700 text-xl'>Department of Computer Science</div>
            </h1>
        </div>
    </header>
  )
}
