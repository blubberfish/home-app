import React, { HTMLAttributes, HTMLInputTypeAttribute, InputHTMLAttributes, useCallback } from 'react'

function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className='px-2 py-1 bg-white border-l-2 border-slate-100 hover:border-slate-300 focus:border-slate-500 focus:outline-0' {...props} />
}

export function LoginForm() {
  return (
    <form className='grid grid-cols-1 grid-rows-3 gap-2' method='POST' action='/api/login' encType='application/x-www-form-urlencoded' onSubmitCapture={e => {
      console.log(e)
    }}>
      <Input required name="userid" type='text' placeholder='Username' />
      <Input required name="password" type='password' placeholder='Password' />
      <button className='bg-slate-500 text-white rounded-sm hover:bg-slate-300'>LOGIN</button>
    </form>
  )
}