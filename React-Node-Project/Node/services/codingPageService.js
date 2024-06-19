const CodingPost = require('../models/codingPost');
const CodingPostSidebar = require('../models/codingPostSidebar');
const path = require('path');
const fs = require('fs');

// 이미지 파일 이름 인코딩 함수
function encodeFileName(fileName) {
    return fileName.replace(/\s/g, '_');
}

exports.uploadImages = (files) => {
    const images = files.map((file) => file.filename); // 파일명만 추출
    const imageUrls = images.map(
        (filename) =>
            `${process.env.DOMAIN}/api/coding/image/${encodeFileName(filename)}`,
    );
    return imageUrls;
};

exports.getImagePath = (image) => {
    return path.join(__dirname, '..', 'uploads', encodeFileName(image));
};

exports.createPost = async ({ title, content, userId, sidebarId }) => {
    const newPost = await CodingPost.create({
        codingPostTitle: title,
        codingPostContent: content,
        userId,
        sidebarId: parseInt(sidebarId),
    });
    return newPost;
};

exports.getPostsBySidebar = async (sidebarId) => {
    const sidebar = await CodingPostSidebar.findOne({
        attributes: ['sidebarName'],
        where: { sidebarId },
    });

    if (!sidebar) {
        throw new Error('사이드바를 찾을 수 없습니다.');
    }

    const posts = await CodingPost.findAll({
        where: { sidebarId },
    });

    return {
        sidebarId: parseInt(sidebarId),
        ListUrl: `/coding/${sidebar.sidebarName}`,
        childrens: posts.map((post) => ({
            codingPostId: post.codingPostId,
            codingPostTitle: post.codingPostTitle,
        })),
    };
};

exports.getPostDetailBySidebar = async (sidebarId, postId) => {
    const sidebar = await CodingPostSidebar.findOne({
        attributes: ['sidebarName'],
        where: { sidebarId },
    });

    if (!sidebar) {
        throw new Error('사이드바를 찾을 수 없습니다.');
    }

    const post = await CodingPost.findOne({
        where: { codingPostId: postId },
    });

    return {
        sidebarId: parseInt(sidebarId),
        DetailUrl: `/coding/${sidebar.sidebarName}/detail/${post.codingPostId}`,
        codingPostId: post.codingPostId,
        codingPostTitle: post.codingPostTitle,
        codingPostContent: post.codingPostContent,
        createdAt: post.createdAt,
        codingPostHashtags: post.codingPostHashtags
            ? post.codingPostHashtags
            : null,
    };
};

exports.updatePost = async (postId, { title, content, sidebarId }) => {
    const updatedPost = await CodingPost.update(
        {
            codingPostTitle: title,
            codingPostContent: content,
            sidebarId: sidebarId,
        },
        { where: { codingPostId: postId } },
    );
    return updatedPost;
};

exports.deletePost = async (postId) => {
    await CodingPost.destroy({ where: { codingPostId: postId } });
};

exports.createSidebar = async ({ sidebarName, parentId }) => {
    let depth = 0;
    let url = `/coding/${sidebarName.replace(/\s/g, '_')}`;

    if (parentId) {
        const parentSidebar = await CodingPostSidebar.findByPk(parentId);
        if (!parentSidebar) {
            throw new Error('부모 사이드바가 존재하지 않습니다.');
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
    return newSidebar;
};

exports.getTopLevelSidebars = async () => {
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
    return topLevelSidebars;
};

const updateChildUrls = async (parentSidebar) => {
    const children = await CodingPostSidebar.findAll({
        where: { parentId: parentSidebar.sidebarId },
    });
    for (const child of children) {
        const newUrl = `${parentSidebar.url}/${child.sidebarName.replace(/\s/g, '_')}`;
        const newDepth = parentSidebar.depth + 1;
        await child.update({ url: newUrl, depth: newDepth });
        await updateChildUrls(child);
    }
};

exports.updateSidebar = async (id, { sidebarName, parentId }) => {
    let depth = 0;
    let url = `/coding/${sidebarName.replace(/\s/g, '_')}`;

    if (parentId) {
        const parentSidebar = await CodingPostSidebar.findByPk(parentId);
        if (!parentSidebar) {
            throw new Error('부모 사이드바가 존재하지 않습니다.');
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

    return updatedSidebar;
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

exports.deleteSidebar = async (id) => {
    await deleteSidebarRecursive(id);
};
