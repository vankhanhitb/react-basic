import React from 'react'

export default function Subscribe() {
  return (
    <div className="bg-primary/30 py-5 mt-25">
      <div className="subcription__heading container m-auto mt-20">
        <h2 className="text-center text-3xl capitalize">Subcription now to get <span className="font-bold text-red-600">UP</span> to <span className="font-bold text-red-600">20% DISCOUNT</span></h2>
      </div>
      <div className="container m-auto mt-10 mb-20 flex justify-center items-center">
        <div className="subcription__form flex max-w-120 w-full justify-center items-center relative">
          <input 
            type="text" 
            name="email" 
            value="Email..." 
            placeholder="Email..." 
            className="
              max-w-120 w-full h-10 
              border border-gray-300 rounded-lg
              pl-2
            "
          />
          <button
           type="button"
           aria-label="submit-button"
           className="
            absolute top-[-0.5px] right-[-0.1px]
            h-10
            p-5
            py-5.3
            flex justify-center items-center
            border border-gray-300 rounded-lg
            bg-gray-900 text-white
            cursor-pointer
            uppercase
           "
          >Submit</button>
        </div>
      </div>
    </div>
  )
}
