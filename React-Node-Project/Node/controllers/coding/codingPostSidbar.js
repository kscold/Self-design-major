const CodingPostSidebar = require('../../models/codingPostSidebar');
const CodingPost = require('../../models/codingPost');

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
