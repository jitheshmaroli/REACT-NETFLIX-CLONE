import React, { useEffect } from "react";
import CardRow from "../components/CardRow/CardRow";
import { action, Adventure, Animated, comedy, horror, SciFi, trending, trendingSeries } from "../Constants/URLs";
import useFetchMovies from "../CustomHooks/useFetchMovies";
import './UserHome.css';
import { imageUrl } from "../Constants/Constants";
import { useNavigate } from "react-router-dom";


const UserHome = () => {
  const navigate = useNavigate();
  const {
    data: trendingMovie,
    loading: trendingLoading,
    error: trendingError
  } = useFetchMovies(trending);

  const {
    data: seriesData,
    loading: seriesLoading,
    error: seriesError
  } = useFetchMovies(trendingSeries);

  const {
    data: actionData,
    loading: actionLoading,
    error: actionError
  } = useFetchMovies(action);

  const {
    data: comedyData,
    loading: comedyLoading,
    error: comedyError
  } = useFetchMovies(comedy);

  const {
    data: scifiData,
    loading: scifiLoading,
    error: scifiError
  } = useFetchMovies(SciFi);

  const {
    data: adventureData,
    loading: adventureLoading,
    error: adventureError
  } = useFetchMovies(Adventure);

  const {
    data: horrorData,
    loading: horrorLoading,
    error: horrorError
  } = useFetchMovies(horror);

  const {
    data: animatedData,
    loading: animatedLoading,
    error: animatedError
  } = useFetchMovies(Animated);

  const backgroundImage = trendingMovie.length > 0 ? `${imageUrl}${trendingMovie[0].backdrop_path}` : ''; 
  
useEffect(() => {
  const handleScroll = () => {
    const navbar = document.querySelector('.stack-custom');
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


const handlePlayClick = () => {
  const movieId = trendingMovie[0]?.id; 
  navigate(`/play`, { state: { movieId } });
};


return (
    <div>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          color: 'white',
          position: 'relative'
        }}
      >
        <div className="banner-content">
          <h1>{!trendingLoading && !trendingError && trendingMovie[0].title}</h1>
          <p>{!trendingLoading && !trendingError && trendingMovie[0].overview}</p>
          <button onClick={handlePlayClick} >Play</button>
          <button>Trailer</button>
        </div>
      </div>
      {trendingLoading && <p>Loading...</p>}
      {trendingError && <p>Error fetching data: {trendingError}</p>}
      {!trendingLoading && !trendingError && <CardRow title="Trending Movies" cards={trendingMovie} />}
      {!seriesLoading && !seriesError && <CardRow title="Trending Series" cards={seriesData} />}
      {!actionLoading && !actionError && <CardRow title="Action" cards={actionData} />}
      {!comedyLoading && !comedyError && <CardRow title="Comedy" cards={comedyData} />}
      {!scifiLoading && !scifiError && <CardRow title="Science Fiction" cards={scifiData} />}
      {!adventureLoading && !adventureError && <CardRow title="Adventure" cards={adventureData} />}
      {!horrorLoading && !horrorError && <CardRow title="Horror" cards={horrorData} />}
      {!animatedLoading && !animatedError && <CardRow title="Animated" cards={animatedData} />}
    </div>
  );
};

export default UserHome;
