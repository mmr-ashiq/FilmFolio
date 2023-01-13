import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=44b1dae8b37e67b7d63b92c8a98c5e17&page=1`;
	const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
	const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=44b1dae8b37e67b7d63b92c8a98c5e17&query=${searchTerm}`;

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(API_URL);
				setMovies(response.data.results);
				setIsLoading(false);
			} catch (error) {
				setError(error);
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

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

	const getClassByRate = (vote) => {
		if (vote >= 8) {
			return 'green';
		} else if (vote >= 5) {
			return 'orange';
		} else {
			return 'red';
		}
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div>
			<div id="main">
				{movies.map((movie) => (
					<div key={movie.id} className="movie">
						<img
							src={`${IMG_PATH}${movie.poster_path}`}
							alt={movie.title}
						/>
						<div className="movie-info">
							<h3>{movie.title}</h3>
							<span
								className={getClassByRate(movie.vote_average)}
							>
								{movie.vote_average}
							</span>
						</div>
						<div className="overview">
							<h3>Overview</h3>
							{movie.overview}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Movies;