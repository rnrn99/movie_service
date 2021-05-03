import React, { useEffect, useState } from 'react';
import './FavoritePage.css';
import axios from 'axios';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites);
                    // console.log(response.data);
                }
                else { alert("Failed to post /api/favorite/getFavoritedMovie"); }
            })
    }, [])

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
                    {Favorites.map((favorite, index) => (
                        <tr key={index}>
                            <td>{favorite.movieTitle}</td>
                            <td>{favorite.movieRunTime} mins</td>
                            <td>
                                <button>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
