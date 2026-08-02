import React from 'react'

type PropsType = {
  children: React.ReactNode;
}
export default function Container({children}: PropsType) {
  return (
    <div className="container m-auto px-3.75">
      {children}
    </div>
  )
}
