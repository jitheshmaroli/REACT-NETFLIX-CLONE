import React from "react";
import { useLocation } from "react-router-dom";
import CardRow from "../components/CardRow/CardRow";
import useFetchMovies from "../CustomHooks/useFetchMovies";
import { API_KEY } from "../Constants/Constants";
import './Play.css';

const Play = () => {
  const location = useLocation();
  const { movieId } = location.state || {}; 
  
  const trailerEndpoint = `/movie/${movieId}/videos?api_key=${API_KEY}`;
  const relatedVideosEndpoint = `/movie/${movieId}/similar?api_key=${API_KEY}`;

  const { data: trailerData, loading: trailerLoading, error: trailerError } = useFetchMovies(trailerEndpoint);
  const { data: relatedVideos, loading: relatedLoading, error: relatedError } = useFetchMovies(relatedVideosEndpoint);

  const trailer = trailerData.find((video) => video.type === "Trailer" && video.site === "YouTube");
  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : "";

  return (
    <div className="play-page">
      <div className="video-container">
        {trailerLoading ? (
          <p>Loading trailer...</p>
        ) : trailerError ? (
          <p>Error loading trailer: {trailerError}</p>
        ) : trailerUrl ? (
          <iframe
            width="100%"
            height="400px"
            src={trailerUrl}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No trailer available.</p>
        )}
      </div>
      {relatedLoading ? (
        <p>Loading related videos...</p>
      ) : relatedError ? (
        <p>Error loading related videos: {relatedError}</p>
      ) : (
        <CardRow title="Related Videos" cards={relatedVideos} />
      )}
    </div>
  );
};

export default Play;
