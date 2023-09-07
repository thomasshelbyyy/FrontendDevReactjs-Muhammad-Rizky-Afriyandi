import { Link } from "react-router-dom"
import StarRating from "./StarRating"

const getCurrentTime = ()=> {
    const currentTime = new Date()
    const midnight = new Date()
    midnight.setHours(0, 0, 0, 0)

    const minutesSinceMidnight = Math.floor((currentTime - midnight) / (1000 * 60))
    return minutesSinceMidnight
}

const Card = ({name, rating, category, priceLevel, openTime, closeTime, image, locationId})=> {
    const currentTime = getCurrentTime()
    return(
        <div className="card">
            <img src={image} alt={name} className="card-image" />
            <p className="card-title">{name}</p>
            <p className="card-rating"><StarRating rating={rating} /></p>
            <div className="card-flex">
                <p>{category}{priceLevel}</p>
                <p>{openTime > currentTime && closeTime < currentTime ? "Open Now" : "Close Now"}</p>
            </div>
            <Link to={`/detail/${locationId}`} >
                <div className="card-button">Learn More</div>
            </Link>
        </div>
    )
}

export default Card