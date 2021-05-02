import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const movieImage = props.movieInfo.backdrop_path;
    const movieRuntime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    
    let variables = {
        userFrom,
        movieId,
        movieTitle,
        movieImage,
        movieRuntime
    }

    const clickFavorite = () => {
        if(Favorited){ 
            // 이미 Favorite check가 되어있는 경우 => Favorited 비활성화
            axios.post('/api/favorite/removeFavorite', variables)
                 .then(response =>{
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    }
                    else alert('Failed to post /api/favorite/removeFavorite');
                 });
        }
        else {
            axios.post('/api/favorite/addFavorite', variables)
            .then(response =>{
               if(response.data.success) {
                   setFavoriteNumber(FavoriteNumber + 1);
                   setFavorited(!Favorited);
                }
               else alert('Failed to post /api/favorite/addFavorite');
            });
        }
    }

    useEffect(() => {

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
            <Button onClick={clickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite