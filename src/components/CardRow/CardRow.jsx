import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import './CardRow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const imageUrl = "https://image.tmdb.org/t/p/original";

const CardRow = ({ title, cards }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    }

    const handlePlayClick = () => {
        if (selectedMovie) {
            navigate(`/play`, { state: { movieId: selectedMovie.id } }); 
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    }

    return (
      <div className="card-row-container">
        <h2>{title}</h2>
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={1}
          slidesPerView={4.2}
          navigation={true}
          scrollbar={{ draggable: true }} 
          loop={false}  
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="card-item">
                <img 
                    onClick={() => handleClick(card)}
                    src={`${imageUrl + card.poster_path}`} 
                    alt={card.title} 
                    className="card-image" 
                />                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {isModalOpen && selectedMovie && (
            <div 
                className="modal-overlay"
                onClick={closeModal}
            >
                <div 
                    className="modal-content"
                    style={{
                        backgroundImage: `url(${imageUrl + selectedMovie.backdrop_path})`
                    }}
                >
                    <div className="modal-details">
                        <h2>{selectedMovie.title}</h2>
                        <p>{selectedMovie.overview}</p>                        
                        <p>Release Date: {selectedMovie.release_date}</p>    
                        <button onClick={handlePlayClick}>Play</button>
                    </div>
                </div>
            </div>
        )}
      </div>
    );
};

export default CardRow;
