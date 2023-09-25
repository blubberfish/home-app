import React, { InputHTMLAttributes } from 'react'

function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className='px-2 py-1 bg-white border-l-2 border-slate-100 hover:border-slate-300 focus:border-slate-500 focus:outline-0' {...props} />
}

export interface LoginErrorMessageProps {
  messageKey?: string | null
  onDismiss?: {
    (): void
  }
}

export function LoginErrorMessage({ messageKey, onDismiss }: LoginErrorMessageProps) {
  if (!messageKey) return null;
  return (
    <div className='fixed flex top-2 left-2 right-2 p-2 bg-red-50 text-red-950'>
      <div className='flex-1'>
        {messageKey}
      </div>
      <button type='button' onClick={onDismiss}>X</button>
    </div>
  )
}