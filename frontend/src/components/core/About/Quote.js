import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div>
      We are passionate about revolutionizing the way we learn. Our innovative platforms
      <HighlightText text={"combines technology"}/>
      <span className='text-amber-500'>
        {" "}
        expertise
        {" "}
      </span>
      , and community to create an
      <span className='text-amber-500'>
        {" "}
        unparalleled education experience
      </span>
    </div>
  )
}

export default Quote
