import React from 'react'

const Character = (props) => {
    let { name, description,thumbnail, characterUri } = props;
    return (
        <div className="my-3">
            <div className="card" style={{width: '12rem'}}>
                <img src={thumbnail} className="card-img-top" alt={name}/>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                        <a href={characterUri} className="btn btn-primary">Know More</a>
                    </div>
            </div>
        </div>
    )

}
export default Character
