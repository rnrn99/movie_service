const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

// 영화의 favorite number 확인
router.post('/favoriteNumber', (req,res) => {

    //mongoDB에서 favorite 정보 찾기
    Favorite.find({"movieId": req.body.movieId})
            .exec((err, info) => {
                if(err) return res.status(400).send(err);
                else return res.status(200).json({ success: true, favoriteNumber: info.length });
            });
});

// 현재 로그인한 유저가 해당 영화를 favorite check 했는지를 확인
router.post('/favorited', (req, res) => {
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom })
            .exec((err, info) => {
                if(err) return res.status(400).send(err);

                let result = false;
                if(info.length !== 0) result = true;
                
                res.status(200).json({ success: true, favorited: result });
            });
});

// Favorite check 비활성화
router.post('/removeFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
            .exec((err, doc) => {
                if(err) return res.status(400).send(err);
                return res.status(200).json({ success: true });
            });
});

// Favorite check 활성화
router.post('/addFavorite', (req, res) => {
    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true, doc});
    });

});

// 유저가 favorite check 한 영화 목록을 가져옴
router.post('/getFavoritedMovie', (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
            .exec((err, favorites) => {
                if(err) return res.status(400).send(err);
                return res.status(200).json({ success: true, favorites });
            });
});

// router.post('/removeFromFavorite', (req,res) => {
//     Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
//             .exec((err, doc) => {
//                 if(err) return res.status(400).send(err);
//                 return res.status(200).json({ success: true });
//             });
// });

module.exports = router;
