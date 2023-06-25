import React from 'react'

const SearchInputComponent = ({ search, id, name, placeholder, onChange }) => (
    <div className='input-group rounded'>
        <input type={search} id={id} className='form-control mb-3 lg-3' name={name} placeholder={placeholder} onInput={onChange} />
    </div>
)

export default SearchInputComponent
