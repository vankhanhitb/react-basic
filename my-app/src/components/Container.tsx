import React from 'react'

type PropsType = {
  children: React.ReactNode;
}
export default function Container({children}: PropsType) {
  return (
    <>
      {children}
    </>
  )
}
