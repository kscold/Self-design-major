const express = require('express');
const { Comment, User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        // 유저 SELECT
        const user = await User.findOne({ where: { id: req.body.id } });

        // 댓글 INSERT
        const comment = await Comment.create({
            comment: req.body.comment,
        });
        const userComment = await user.addComment(comment); // 댓글과 유저를 연결
        console.log(comment);
        res.status(201).json(userComment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router
    .route('/:id')
    .patch(async (req, res, next) => {
        try {
            const result = await Comment.update(
                {
                    comment: req.body.comment,
                },
                {
                    where: { id: req.params.id },
                }
            );
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Comment.destroy({
                where: { id: req.params.id },
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
