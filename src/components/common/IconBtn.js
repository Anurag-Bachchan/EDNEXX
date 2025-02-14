import React from 'react'

const IconBtn = ({text, onclick, children, disabled, outline=false, customClasses, type}) => {
  return (
    <button  className='rounded-[8px] bg-yellow-300 py-[8px] px-[16px] h-10  flex items-center justify-center font-medium text-slate-900' disabled={disabled} onClick={onclick} type={type}>
        {
            children ? (
                <>
                  <div className='flex gap-1'>
                    <div className='text-lg text-slate-800'>
                        {text}
                    </div>
                    <div className='mt-1'>
                       {children}    
                    </div>
                  </div>
                  </>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn
