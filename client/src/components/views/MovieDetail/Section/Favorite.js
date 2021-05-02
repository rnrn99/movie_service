import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const movieImage = props.movieInfo.backdrop_path;
    const movieRuntime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    useEffect(() => {

        let variables = {
            userFrom,
            movieId
        }

        axios.post('/api/favorite/favoriteNumber', variables)
             .then(response => {
                if (response.data.success) { setFavoriteNumber(response.data.favoriteNumber);}
                else alert('Failed to post /api/favorite/favoriteNumber');
             });

        axios.post('/api/favorite/favorited', variables)
             .then(response => {
                if (response.data.success) { setFavorited(response.data.favorited);}
                else alert('Failed to post /api/favorite/favorited');
             });

    }, []);

    return (
        <div>
            <button>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite