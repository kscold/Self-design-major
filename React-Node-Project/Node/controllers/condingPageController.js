const CodingPost = require('../models/codingPost');
const CodingPostSidebar = require('../models/codingPostSidebar');
const path = require('path');
const fs = require('fs');

// 이미지 파일 이름 인코딩 함수
function encodeFileName(fileName) {
    return fileName.replace(/\s/g, '_');
}

// 이미지를 업로드하는 API
exports.postImage = async (req, res, next) => {
    try {
        const images = req.files.map((file) => file.filename); // 파일명만 추출

        // 이미지 URL 배열 생성
        const imageUrls = images.map(
            (filename) =>
                `${process.env.DOMAIN}/api/coding/image/${encodeFileName(filename)}`,
        );

        // 클라이언트에게 이미지 URL 배열을 응답
        res.status(200).json({ images: imageUrls });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 이미지를 가져오는 API
exports.getImage = async (req, res, next) => {
    try {
        const { image } = req.params;
        const imagePath = path.join(
            __dirname,
            '..', // 프로젝트 구조에 맞게 조정 필요
            'uploads',
            encodeFileName(image), // 파일명 인코딩
        );

        console.log('Requested image path:', imagePath); // 요청된 이미지 경로 로깅

        // 파일 존재 여부 확인
        fs.access(imagePath, fs.constants.F_OK, async (err) => {
            if (err) {
                console.error('Error accessing file:', err);
                return res.status(404).json({ error: 'Image not found' });
            }

            // 파일이 존재할 경우 클라이언트에게 파일 전송
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
        const { title, content, sidebarId } = req.body;

        // 필수 정보인 title, content, sidebarId가 없는 경우 에러 처리
        if (!title || !content || !sidebarId) {
            return res.status(400).json({
                error: 'title, content, sidebarId는 필수 속성입니다.',
            });
        }

        const newPost = await CodingPost.create({
            codingPostTitle: title,
            codingPostContent: content,
            userId: req.user.id, // Passport에서 인증된 사용자의 id를 가져옴
            sidebarId: parseInt(sidebarId),
        });

        res.status(200).json(newPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 사이드바 ID에 해당하는 게시물 리스트 조회하는 API
exports.getPostsBySidebar = async (req, res, next) => {
    try {
        const { sidebarId } = req.params;

        // 사이드바 ID에 해당하는 사이드바 이름 조회
        const sidebar = await CodingPostSidebar.findOne({
            attributes: ['sidebarName'],
            where: { sidebarId },
        });

        if (!sidebar) {
            return res
                .status(404)
                .json({ error: '사이드바를 찾을 수 없습니다.' });
        }

        // 사이드바 ID에 해당하는 게시물 목록 조회
        const posts = await CodingPost.findAll({
            where: { sidebarId },
        });

        // 클라이언트가 요구하는 형식으로 데이터를 가공
        const response = {
            sidebarId: parseInt(sidebarId), // 숫자 형태로 변환
            ListUrl: `/coding/${sidebar.sidebarName}`, // 사이드바 이름을 URL로 사용
            childrens: posts.map((post) => ({
                codingPostId: post.codingPostId, // 아이디
                codingPostTitle: post.codingPostTitle, // 타이틀
            })),
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 사이드바 ID와 게시물 ID에 해당하는 게시물 상세 정보 조회하는 API
exports.getPostDetailBySidebar = async (req, res, next) => {
    try {
        const { sidebarId, postId } = req.params;

        // 사이드바 ID에 해당하는 사이드바 이름 조회
        const sidebar = await CodingPostSidebar.findOne({
            attributes: ['sidebarName'],
            where: { sidebarId },
        });

        if (!sidebar) {
            return res
                .status(404)
                .json({ error: '사이드바를 찾을 수 없습니다.' });
        }

        // 사이드바 ID와 게시물 ID에 해당하는 게시물 상세 정보 조회
        const post = await CodingPost.findOne({
            where: { codingPostId: postId },
        });

        // 클라이언트가 요구하는 형식으로 데이터를 가공
        const response = {
            sidebarId: parseInt(sidebarId), // 숫자 형태로 변환
            DetailUrl: `/coding/${sidebar.sidebarName}/detail/${post.codingPostId}`, // 사이드바 이름을 URL로 사용
            codingPostId: post.codingPostId, // 숫자
            codingPostTitle: post.codingPostTitle,
            codingPostContent: post.codingPostContent,
            // codingPostImages: post.codingPostImages.map((image) => image),
            createdAt: post.createdAt,
            codingPostHashtags: post.codingPostHashtags
                ? post.codingPostHashtags
                : null,
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 사이드바에 속한 게시물을 수정하는 API
exports.updatePostInSidebar = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { title, content, sidebarId } = req.body;

        // 이미지 업데이트가 있을 경우 처리 로직 추가 예정

        const updatedPost = await CodingPost.update(
            {
                codingPostTitle: title,
                codingPostContent: content,
                sidebarId: sidebarId, // 사이드바 ID도 업데이트
            },
            { where: { codingPostId: postId } },
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
        await CodingPost.destroy({ where: { codingPostId: postId } });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.createSidebar = async (req, res, next) => {
    try {
        const { sidebarName, parentId } = req.body;
        let depth = 0;
        let url = `/coding/${sidebarName.replace(/\s/g, '_')}`;

        // 부모 사이드바가 있을 경우 부모의 depth에 1을 더하고 URL에 부모의 URL을 추가
        if (parentId) {
            const parentSidebar = await CodingPostSidebar.findByPk(parentId);
            if (!parentSidebar) {
                return res
                    .status(404)
                    .json({ error: '부모 사이드바가 존재하지 않습니다.' });
            }
            depth = parentSidebar.depth + 1;
            url = `${parentSidebar.url}/${sidebarName.replace(/\s/g, '_')}`;
        }

        const newSidebar = await CodingPostSidebar.create({
            sidebarName,
            depth,
            url,
            parentId,
        });
        res.status(200).json(newSidebar);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.getSidebar = async (req, res, next) => {
    try {
        const topLevelSidebars = await CodingPostSidebar.findAll({
            where: { parentId: null },
            include: {
                model: CodingPostSidebar,
                as: 'children',
                include: {
                    model: CodingPostSidebar,
                    as: 'children',
                },
            },
        });
        res.status(200).json(topLevelSidebars);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const updateChildUrls = async (parentSidebar) => {
    const children = await CodingPostSidebar.findAll({
        where: { parentId: parentSidebar.sidebarId },
    });
    for (const child of children) {
        const newUrl = `${parentSidebar.url}/${child.sidebarName.replace(/\s/g, '_')}`;
        const newDepth = parentSidebar.depth + 1;
        await child.update({ url: newUrl, depth: newDepth });
        await updateChildUrls(child); // Recursive call to update children of this child
    }
};

exports.updateSidebar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { sidebarName, parentId } = req.body;
        let depth = 0;
        let url = `/coding/${sidebarName.replace(/\s/g, '_')}`;

        if (parentId) {
            const parentSidebar = await CodingPostSidebar.findByPk(parentId);
            if (!parentSidebar) {
                return res
                    .status(404)
                    .json({ error: '부모 사이드바가 존재하지 않습니다.' });
            }
            depth = parentSidebar.depth + 1;
            url = `${parentSidebar.url}/${sidebarName.replace(/\s/g, '_')}`;
        }

        const updatedSidebar = await CodingPostSidebar.update(
            { sidebarName, depth, url, parentId },
            { where: { sidebarId: id } },
        );

        const sidebar = await CodingPostSidebar.findByPk(id);
        await updateChildUrls(sidebar);

        res.status(200).json(updatedSidebar);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const deleteSidebarRecursive = async (sidebarId) => {
    const children = await CodingPostSidebar.findAll({
        where: { parentId: sidebarId },
    });
    for (const child of children) {
        await deleteSidebarRecursive(child.sidebarId);
    }
    await CodingPost.destroy({ where: { sidebarId } });
    await CodingPostSidebar.destroy({ where: { sidebarId } });
};

exports.deleteSidebar = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteSidebarRecursive(id);
        res.status(200).json({
            message: '사이드바와 연관된 모든 항목이 삭제되었습니다.',
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
