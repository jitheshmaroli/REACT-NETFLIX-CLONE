import  { useState, useEffect } from 'react'
import { API_BASE_URL, API_KEY } from '../Constants/Constants';

const useFetchMovies = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, serError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: API_KEY
                    }
                })
                const result = await response.json();
                setData(result.results);
            } catch (err) {
                serError(err.message)
            }
            setLoading(false);
        };

        fetchData();
    }, [endpoint]);

    return {data, loading, error};
    
}

export default useFetchMovies