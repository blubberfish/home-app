import React from 'react'
import { LoginForm } from './LoginForm'

export default function Login() {
  return (
    <div className='h-full grid grid-cols-1 grid-rows-1 md:grid-cols-2'>
      <div className='hidden md:flex bg-slate-600'>TEST 1</div>
      <div className='flex items-center justify-center'>
        <LoginForm />
      </div>
    </div>
  )
}