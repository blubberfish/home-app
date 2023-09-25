import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { LoginErrorMessage } from './LoginError'
import { LoginForm } from './LoginForm'

export default function Login() {
  const [search, setSearch] = useSearchParams()

  const userid = search.get('uid');
  const token = search.get('token');
  const failReason = search.get('failreason');

  return (
    <div className='h-full bg-zinc-50 grid grid-cols-1 grid-rows-1 md:grid-cols-2'>
      <LoginErrorMessage messageKey={failReason} onDismiss={() => {
        setSearch(current => {
          const next = new URLSearchParams(current);
          next.delete('failreason')
          return next;
        })
      }} />
      <div className='hidden md:flex bg-slate-600'>TEST 1</div>
      <div className='flex items-center justify-center'>
        <LoginForm />
      </div>
    </div>
  )
}