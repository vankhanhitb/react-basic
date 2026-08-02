import React from 'react'

type PropType = {
  children: React.ReactNode;
  className?: string
}

export default function Card ({ children, className }: PropType) {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  )
}
