import React from 'react'

const CurrentPlaylistTitleComponent = ({ title, onClick }) => (
    <button
        type='button' className='list-group-item list-group-item-action px-3 border-0 active'
        aria-current='true ' onClick={onClick}
    >
        {title}
    </button>
)
export default CurrentPlaylistTitleComponent
