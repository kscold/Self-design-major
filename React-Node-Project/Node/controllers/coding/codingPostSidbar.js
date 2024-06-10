const CodingPostSidebar = require('../../models/codingPostSidebar');

exports.createSidebar = async (req, res, next) => {
    try {
        const { sidebarName, parentId } = req.body;
        let depth = 0;

        // 부모 사이드바가 있을 경우 부모의 depth에 1을 더함
        if (parentId) {
            const parentSidebar = await CodingPostSidebar.findByPk(parentId);
            if (!parentSidebar) {
                return res
                    .status(404)
                    .json({ error: '부모 사이드바가 존재하지 않습니다.' });
            }
            depth = parentSidebar.depth + 1;
        }

        const url = `/coding/${sidebarName.replace(/\s/g, '_')}`;
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

exports.updateSidebar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { sidebarName, parentId } = req.body;

        // parentId가 0이면 부모 사이드바가 없으므로 depth를 0으로 설정
        let depth = 0;

        // parentId가 존재하면 부모 사이드바의 depth에 1을 더함
        if (parentId) {
            const parentSidebar = await CodingPostSidebar.findByPk(parentId);
            if (!parentSidebar) {
                return res
                    .status(404)
                    .json({ error: '부모 사이드바가 존재하지 않습니다.' });
            }
            depth = parentSidebar.depth + 1;
        }

        const url = `/coding/${sidebarName.replace(/\s/g, '_')}`;
        const updatedSidebar = await CodingPostSidebar.update(
            { sidebarName, depth, url, parentId },
            { where: { sidebarId: id } },
        );
        res.status(200).json(updatedSidebar);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deleteSidebar = async (req, res, next) => {
    try {
        const { id } = req.params;
        await CodingPostSidebar.destroy({ where: { sidebarId: id } });
        res.status(200).json({ message: '게시물이 삭제되었습니다.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
