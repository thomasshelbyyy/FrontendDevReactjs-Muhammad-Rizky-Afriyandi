import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import StarRating from "../components/StarRating"
import ReviewCard from "../components/ReviewCard"
import {HiLocationMarker} from "react-icons/hi"
import { AiFillPhone, AiOutlineClockCircle } from "react-icons/ai"

const getCurrentTime = ()=> {
    const currentTime = new Date()
    const midnight = new Date()
    midnight.setHours(0, 0, 0, 0)

    const minutesSinceMidnight = Math.floor((currentTime - midnight) / (1000 * 60))
    return minutesSinceMidnight
}

const DetailView = ()=> {
    const {id} = useParams()
    const [restaurant, setRestaurant] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const currentTime = getCurrentTime()
    useEffect(()=> {
        const fetchData = async ()=> {
            setIsLoading(true)
            try {
                const result = await axios.get('https://travel-advisor.p.rapidapi.com/restaurants/get-details', {
                    params: {
                        location_id: id,
                        currency: 'USD',
                        lang: 'en_US'
                    },
                    headers: {
                        'X-RapidAPI-Key': 'f23d0bcd13msh979b6667d0d3157p14c7d3jsnd4afcf1412b9',
                        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                    }
                })
                setRestaurant(result.data)
                console.log(result.data)
                console.log(currentTime)
            } catch(error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [id])

    return(
        <div className="detail">
            {isLoading ? <p>Loading...</p> : (
                <>
                    <div className="restaurant-detail">
                        <h2>{restaurant.name && restaurant.name}</h2>
                        <div className="rating">
                            <span><StarRating rating="3" /> {restaurant.reviews && restaurant.reviews.length} Reviews</span>
                            <span>{restaurant.ranking && restaurant.ranking}</span>
                            <span>{restaurant.price_level && restaurant.price_level},</span>
                            <span className="meal-types">{restaurant.meal_types && restaurant.meal_types.map(type => <p key={type.key}>{`${type.name} `}</p>)}</span>
                        </div>
                    </div>

                    <div className="contact">
                        <span><HiLocationMarker />{restaurant.address && restaurant.address}</span>
                        <span><AiFillPhone />{restaurant.phone && restaurant.phone}</span>
                        <span className="link"><Link to={restaurant.website && restaurant.website}>Website</Link></span>
                        <span><AiOutlineClockCircle />{restaurant.hours && restaurant.hours.week_ranges.open_time >  currentTime && restaurant.hours.week_ranges.close_time < currentTime ? "Open Now" : "Close Now"}</span>
                    </div>

                    <div className="review-and-image">
                        <div className="review-container">
                            <h3>Reviews</h3>
                            {restaurant.reviews && restaurant.reviews.length > 0 && restaurant.reviews.map(review => (
                                <ReviewCard 
                                    key={review.review_id}
                                    author={review.author}
                                    rating={review.rating}
                                    title={review.title}
                                    summary={review.summary}
                                />
                            ))}
                        </div>
                        <img src={restaurant.photo && restaurant.photo.images.original.url} alt="restaurant photo" className="image" />
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailView