import React from 'react'

function renderLi (item, index, onClickItemHandle, onClickToggle) {
    return (
        <li key={index}>

            <i id={item.id} onClick={onClickToggle} />

            <span id={item.master_id} data-index={index} onClick={onClickItemHandle}>
                {item.title}
            </span>

        </li>
    )
}

const ListComponent = ({ items, onClickItemHandle, onClickToggle }) => (
    <div>
        <ul className='list-group'> {items.map((item, index) => renderLi(item, index, onClickItemHandle, onClickToggle))} </ul>
    </div>
)

export default ListComponent
