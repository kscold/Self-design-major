const Hashtag = require('../models/hashtag');
const CodingPost = require('../models/codingPost');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
    try {
        const post = await CodingPost.create({
            title: req.body.title,
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });

        const hashtags = req.body.content.match(/#[^\s#]*/g);

        if (hashtags) {
            const result = await Promise.all(
                hashtags.map((tag) => {
                    return Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase() },
                    });
                }),
            );

            await post.addHashtags(result.map((r) => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.showPosts = async (req, res, next) => {
    try {
        const posts = await CodingPost.findAll({
            include: {
                model: Hashtag,
                through: { attributes: [] },
            },
        });
        res.render('main', { posts });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
