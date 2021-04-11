import React from 'react'

const Button = (props) => {
    return (
        <button className={`px-3 py-2 rounded mx-1 bg-${props.bg ? props.bg : 'white'} hover:bg-${props.bg ? props.bg : 'gray-100'} text-gray-500 hover:text-gray-800 font-semibold transition-all ease-in-out duration-300`}>
            {props.text}
        </button>
    )
}

export default Button
