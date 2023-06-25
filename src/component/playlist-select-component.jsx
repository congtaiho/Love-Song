import React from 'react'

const PlaylistSelectComponent = ({ id, name, options, onChange }) => (
    <div>
        <select onChange={onChange} name={name} id={id} className='form-select'>
            {options.map((option, index) => (
                <option key={index} value={option.id}>{option.title}</option>
            ))}
        </select>

    </div>
)

export default PlaylistSelectComponent
