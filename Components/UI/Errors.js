import React from 'react'

const Errors = ({ errors }) => {
    return (
        <div className="bg-red-100 text-xs font-semibold text-red-700 flex items-center justify-start p-2 rounded-md my-1">
            {errors}
        </div>
    )
}

export default Errors
