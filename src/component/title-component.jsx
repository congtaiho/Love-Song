import React from 'react'

const TitleComponent = ({ title, description, onClick, isTitleAdded }) => (
    <div className='col-sm-6'>
        <div className='card'>
            <div className='card-body'>
                <h5 className='card-title'>{title}</h5>
                <p>{description}</p>
                <button onClick={onClick} type='button' class='btn btn-outline-success btn-floating' data-mdb-ripple-color='dark'>
                    <i className={isTitleAdded} />
                </button>
            </div>
        </div>
    </div>
)

export default TitleComponent
