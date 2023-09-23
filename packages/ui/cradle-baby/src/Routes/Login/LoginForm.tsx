import React from 'react'

export function LoginForm() {
  return (
    <form className='grid grid-cols-1 grid-rows-2 gap-2'>
      <div className='pl-2 border-l-2 border-slate-200 hover:border-slate-500'>
        <input className='px-2 py-1' placeholder='Username' />
      </div>
      <div className='pl-2 border-l-2 border-slate-200 hover:border-slate-500'>
        <input className='px-2 py-1' placeholder='Password' />
      </div>
    </form>
  )
}