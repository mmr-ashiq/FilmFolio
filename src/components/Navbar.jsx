import axios from 'axios';
import React, { useState } from 'react';


const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=44b1dae8b37e67b7d63b92c8a98c5e17&query=${searchTerm}`;

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.get(SEARCH_API);
            setMovies(response.data.results);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <header>
            <div className="container">
                <a href="./" className="logo">
                    ANCb
                </a>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search for a movie"
                        onChange={handleChange}
                    />
                </form>
            </div>
        </header>
    );
};

export default Navbar;
