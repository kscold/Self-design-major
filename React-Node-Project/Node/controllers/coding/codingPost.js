// const Hashtag = require('../../models/hashtag');
// const CodingPost = require('../../models/coding');
// const path = require('path');
// const fs = require('fs');
//
// // // 인코딩 함수
// // function encodeFileName(fileName) {
// //     return fileName.replace(/\s/g, '_');
// // }
// //
// // // 디코딩 함수
// // function decodeFileName(encodedFileName) {
// //     return encodedFileName.replace(/_/g, ' ');
// // }
// //
// // exports.afterUploadImages = async (req, res, next) => {
// //     try {
// //         if (req.files && req.files.length > 0) {
// //             const imageNames = req.files.map((file) =>
// //                 encodeFileName(file.filename),
// //             );
// //             req.body.images = imageNames; // 배열로 할당
// //         }
// //         next();
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: 'Error uploading images' });
// //     }
// // };
// //
// // exports.uploadPost = async (req, res, next) => {
// //     try {
// //         // 게시물 생성
// //         const post = await CodingPost.create({
// //             title: req.body.title,
// //             content: req.body.content,
// //             images: req.body.images || [], // 이미지 URL 배열 저장, 이미지가 없는 경우 빈 배열로 저장
// //             userId: req.user.id, // 로그인된 사용자의 ID 사용
// //             hashtags: req.body.hashtags || [], // 해시태그 배열 저장, 없는 경우 빈 배열로 저장
// //         });
// //
// //         // 해시태그 처리
// //         if (req.body.hashtags && req.body.hashtags.length > 0) {
// //             const hashtagInstances = await Promise.all(
// //                 req.body.hashtags.map((tag) =>
// //                     Hashtag.findOrCreate({
// //                         where: { title: tag.toLowerCase() },
// //                     }),
// //                 ),
// //             );
// //             await post.addHashtags(
// //                 hashtagInstances.map(([hashtag]) => hashtag),
// //             );
// //         }
// //
// //         res.status(200).json({ message: '게시물이 등록되었습니다.' }); // 200 상태 코드와 메시지 반환
// //     } catch (error) {
// //         console.error(error);
// //         next(error);
// //     }
// // };
//
// // exports.showPosts = async (req, res, next) => {
// //     try {
// //         const posts = await CodingPost.findAll({
// //             include: {
// //                 model: Hashtag,
// //                 through: { attributes: [] },
// //             },
// //         });
// //
// //         const postsWithImageData = posts.map((post) => ({
// //             ...post.toJSON(),
// //             images: post.images,
// //             imagesUrls: post.images.map(
// //                 (filename) =>
// //                     `${req.protocol}://${req.get('host')}/api/coding/uploads/${encodeFileName(filename)}`,
// //             ),
// //         }));
// //
// //         res.json(postsWithImageData);
// //     } catch (error) {
// //         console.error(error);
// //         next(error);
// //     }
// // };
//
// exports.getImage = async (req, res, next) => {
//     try {
//         const { image } = req.params;
//         const imagePath = path.join(
//             __dirname,
//             '..',
//             '..',
//             'uploads',
//             decodeFileName(image),
//         );
//
//         fs.access(imagePath, fs.constants.F_OK, (err) => {
//             if (err) {
//                 return res.status(404).json({ error: 'Image not found' });
//             }
//
//             res.sendFile(imagePath);
//         });
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };
//
// exports.createPostWithSidebar = async (req, res, next) => {
//     try {
//         const { title, content, images, userId, hashtags, sidebarId } =
//             req.body;
//
//         // 필수 정보인 title, content, sidebarId가 없는 경우 에러 처리
//         if (!title || !content || !sidebarId) {
//             return res.status(400).json({
//                 error: 'Title, content, sidebarId는 필수 속성입니다.',
//             });
//         }
//
//         const newPost = await CodingPost.create({
//             title,
//             content,
//             images: images || [],
//             userId,
//             hashtags: hashtags || [],
//             sidebarId,
//         });
//         res.status(200).json(newPost);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };
//
// exports.getPostsBySidebar = async (req, res, next) => {
//     try {
//         const { sidebarId } = req.params;
//         const posts = await CodingPost.findAll({
//             where: { sidebarId },
//         });
//         res.json(posts);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };
//
// exports.updatePostInSidebar = async (req, res, next) => {
//     try {
//         const { postId } = req.params;
//         const { title, content, images, hashtags } = req.body;
//         const updatedPost = await CodingPost.update(
//             { title, content, images, hashtags },
//             { where: { id: postId } },
//         );
//         res.json(updatedPost);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };
//
// exports.deletePostInSidebar = async (req, res, next) => {
//     try {
//         const { postId } = req.params;
//         await CodingPost.destroy({ where: { id: postId } });
//         res.sendStatus(204);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };

const CodingPost = require('../../models/codingPost');
const path = require('path');
const fs = require('fs');

// 이미지 파일 이름 인코딩 함수
function encodeFileName(fileName) {
    return fileName.replace(/\s/g, '_');
}

// 이미지 파일 이름 디코딩 함수
function decodeFileName(encodedFileName) {
    return encodedFileName.replace(/_/g, ' ');
}

// 이미지를 가져오는 API
exports.getImage = async (req, res, next) => {
    try {
        const { image } = req.params;
        const imagePath = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            decodeFileName(image),
        );

        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({ error: 'Image not found' });
            }

            res.sendFile(imagePath);
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 게시물과 사이드바를 함께 생성하는 API
exports.createPostWithSidebar = async (req, res, next) => {
    try {
        const { title, content, images, userId, hashtags, sidebarId } =
            req.body;

        // 필수 정보인 title, content, sidebarId가 없는 경우 에러 처리
        if (!title || !content || !sidebarId) {
            return res.status(400).json({
                error: 'title, content, sidebarId는 필수 속성입니다.',
            });
        }

        const newPost = await CodingPost.create({
            title,
            content,
            images: images || [],
            userId,
            hashtags: hashtags || [],
            sidebarId,
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 사이드바 ID에 해당하는 게시물을 조회하는 API
exports.getPostsBySidebar = async (req, res, next) => {
    try {
        const { sidebarId } = req.params;
        const posts = await CodingPost.findAll({ where: { sidebarId } });
        res.json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 사이드바에 속한 게시물을 수정하는 API
exports.updatePostInSidebar = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { title, content, images, hashtags } = req.body;
        const updatedPost = await CodingPost.update(
            { title, content, images, hashtags },
            { where: { id: postId } },
        );
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 사이드바에 속한 게시물을 삭제하는 API
exports.deletePostInSidebar = async (req, res, next) => {
    try {
        const { postId } = req.params;
        await CodingPost.destroy({ where: { id: postId } });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
