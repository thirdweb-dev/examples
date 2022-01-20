import './Card.css'

function Card({title,imageUrl,body}:{title:any,imageUrl:any,body:any}) {
    return(
    <div className="card-container">
        <div className="image-container">
            <img src={imageUrl} alt=''/>
        </div>

        <div className="card-content">
            <div className="card-title">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                <p>{body}</p>
            </div>
        </div>
        
    </div>)
}

export default Card