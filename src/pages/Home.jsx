import { useState, useEffect } from "react"
import Card from "../components/Card"
import axios from "axios"

const today = new Date()
const todayIndex = today.getDay()

const HomePage = ()=> {

    const [openActive, setOpenActive] = useState(false)
    const [restaurants, setRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [price, setPrice] = useState("all prices")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=> {
        const fetchData = async ()=> {
            setIsLoading(true)
            try {

                const results = await axios.get("https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng", {
                    params: {
                        latitude: '12.91285',
                        longitude: '100.87808',
                        limit: '30',
                        currency: 'USD',
                    },
                    headers: {
                        'X-RapidAPI-Key': 'f23d0bcd13msh979b6667d0d3157p14c7d3jsnd4afcf1412b9',
                        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                    }
                })
                const filteredResults = results.data.data.filter(res => !res.hasOwnProperty("ad_position"))
                setRestaurants(filteredResults)
                setFilteredRestaurants(filteredResults)
            } catch(error) {
                console.log(error)
            }
            setIsLoading(false)
        }

        fetchData()
    }, [])

    useEffect(()=> {
        if(restaurants.length > 0) {

            if(price !== "all prices") {
                const filter = restaurants.filter(restaurant => restaurant.price_level === price)
                setFilteredRestaurants(filter)
                
            } else {
                setFilteredRestaurants(restaurants)
            }
        }
    }, [price])

    // console.log({filteredRestaurants, restaurants})

    const handlePriceChange = e => setPrice(e.target.value)

    return(
        <div className="home">
            <h1 className="title">Restaurant</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dolorum officia expedita error reprehenderit provident consequatur, tenetur corporis aliquam.</p>
            <hr />
            <div className="filter">
                <p>Filter By:</p>
                <button className={`button ${openActive ? "active" : ""}`} onClick={()=> setOpenActive(!openActive)}>Open Now</button>
                <select name="price" id="price" className="button" onChange={handlePriceChange} value={price}>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$ - $$$">$$ - $$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>
                    <option value="all prices">All Prices</option>
                </select>
                <select name="categories" id="categories" className="button">
                    <option value="Categories">categories</option>
                </select>
            </div>

            <div className="cards-container">
                {isLoading ? <p>Loading...</p> :  filteredRestaurants.length > 0 ? filteredRestaurants.map(restaurant => (
                        <Card 
                            key={restaurant.location_id} 
                            locationId={restaurant.location_id}
                            name={restaurant.name}
                            rating={restaurant.rating}
                            category={restaurant.category.name}
                            priceLevel={restaurant.price_level}
                            openTime={restaurant.hours && restaurant.hours.week_ranges[todayIndex].open_time}
                            closeTime={restaurant.hours && restaurant.hours.week_ranges[todayIndex].close_time}
                            image={restaurant.photo && restaurant.photo.images.large.url}
                        />
                )) : (
                    <h1>No Restaurants Found</h1>
                )}
            </div>
        </div>
    )
}

export default HomePage