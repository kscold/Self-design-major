const {
    uploadImages,
    getImagePath,
    createPost,
    getPostsBySidebar,
    getPostDetailBySidebar,
    updatePost,
    deletePost,
    createSidebar,
    getTopLevelSidebars,
    updateSidebar,
    deleteSidebar,
} = require('../services/codingPageService');
const fs = require('fs');

// 이미지를 업로드하는 API
exports.postImage = async (req, res, next) => {
    try {
        const imageUrls = uploadImages(req.files);
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
        const imagePath = getImagePath(image);

        console.log('Requested image path:', imagePath);

        fs.access(imagePath, fs.constants.F_OK, async (err) => {
            if (err) {
                console.error('Error accessing file:', err);
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
        const { title, content, sidebarId } = req.body;

        if (!title || !content || !sidebarId) {
            return res.status(400).json({
                error: 'title, content, sidebarId는 필수 속성입니다.',
            });
        }

        const newPost = await createPost({
            title,
            content,
            userId: req.user.id,
            sidebarId,
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
        const response = await getPostsBySidebar(sidebarId);
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
        const response = await getPostDetailBySidebar(sidebarId, postId);
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

        const updatedPost = await updatePost(postId, {
            title,
            content,
            sidebarId,
        });
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
        await deletePost(postId);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 사이드바 생성 API
exports.createSidebar = async (req, res, next) => {
    try {
        const { sidebarName, parentId } = req.body;
        const newSidebar = await createSidebar({ sidebarName, parentId });
        res.status(200).json(newSidebar);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 사이드바 조회 API
exports.getSidebar = async (req, res, next) => {
    try {
        const topLevelSidebars = await getTopLevelSidebars();
        res.status(200).json(topLevelSidebars);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 사이드바 수정 API
exports.updateSidebar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { sidebarName, parentId } = req.body;
        const updatedSidebar = await updateSidebar(id, {
            sidebarName,
            parentId,
        });
        res.status(200).json(updatedSidebar);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 사이드바 삭제 API
exports.deleteSidebar = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteSidebar(id);
        res.status(200).json({
            message: '사이드바와 연관된 모든 항목이 삭제되었습니다.',
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
