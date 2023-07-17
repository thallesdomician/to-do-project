import React from 'react'
interface ILinkButtonContentProps {
    text:String
}
function LinkButtonContent({text}: ILinkButtonContentProps) {
  return (
    <span className='font-medium'>{text}</span>
  )
}

export default LinkButtonContent