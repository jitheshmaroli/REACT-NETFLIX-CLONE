import Button from 'react-bootstrap/esm/Button'
import './Home.css'
import CardRow from '../CardRow/CardRow'
import useFetchMovies from '../../CustomHooks/useFetchMovies'
import { trending } from '../../Constants/URLs'
import Cards from '../Cards/Cards'


const Home = () => {
  const {data: trendingMovie, loading, error } = useFetchMovies(trending)
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Trending Movies:", trendingMovie);

 
  return (
    <>
    <div className="main">
      <div className="home">
        <h1>Unlimited movies, TV shows and more</h1>
        <p>Starts at ₹149. Cancel at any time.</p>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <div className="subscribe-email">
            <input type="email" placeholder='Email Address' />
            <Button>Get started</Button>
        </div>
      </div>
    </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error}</p>}
      {!loading && !error && <CardRow title="Trending Now" cards={trendingMovie} />}
      <div className="cards">
        <h2>More reasons to join</h2>
        <div className="cards-row">
          <Cards 
            title="Enjoy on your TV" 
            text="Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more." 
          />
          <Cards 
            title="Download your shows to watch offline" 
            text="Save your favourites easily and always have something to watch." 
          />
          <Cards 
            title="Watch everywhere" 
            text="Stream unlimited movies and TV shows on your phone, tablet, laptop and TV." 
          />
          <Cards 
            title="Create profiles for kids" 
            text="Send kids on adventures with their favourite characters in a space made just for them — free with your membership." 
          />
        </div>
      </div>
    </>
  )
}

export default Home