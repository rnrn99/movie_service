import React, { useEffect, useState } from 'react';
import './FavoritePage.css';
import { IMAGE_BASE_URL } from '../../Config';
import axios from 'axios';
import { Popover } from 'antd';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoriteMovie();
    }, []);

    const fetchFavoriteMovie = () => {
        axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites);
                    // console.log(response.data);
                }
                else { alert("Failed to post /api/favorite/getFavoritedMovie"); }
            });
    }

    const clickRemove = (movieId, userFrom) => {
        const variables ={
            movieId,
            userFrom
        }

        axios.post('/api/favorite/removeFavorite', variables)
             .then(response => {
                 if(response.data.success){ fetchFavoriteMovie(); }
                 else alert("Failed to post /api/favorite/removeFromFavorite");
             });
    }

    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.movieImage ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.movieImage}`} /> : "no image"
                }
            </div>
        )

        return (
            <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover>
                <td>{favorite.movieRunTime} mins</td>
                <td>
                    <button onClick={() => clickRemove(favorite.movieId, favorite.userFrom)}>Remove</button>
                </td>
            </tr>
        )
    });

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>Favorite Movies</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
