import React from 'react'
const AlbumComponent = ({ coverImage, title, format, onClick }) => (
    <div className='card' style={{ width: '14rem' }}>
        <img src={coverImage} className='card-img-top' alt='...' />
        <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            {format.map((fr, index) => <span key={index}>{fr}, </span>)}
            <button className='btn btn-primary' onClick={onClick}>Voir l'album</button>
        </div>
    </div>
)
export default AlbumComponent
