const axios = require('axios');

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN;

exports.test = async (req, res, next) => {
    try {
        // 세선에 토큰이 있으면 새로 발급을 받지 않기 위하여
        if (!req.session.jwt) {
            const tokenResult = await axios.post(
                'http://localhost:8081/v1/token',
                {
                    clientSecret: process.env.CLIENT_SECRET,
                },
            );
            if (tokenResult.data?.code === 200) {
                req.session.jwt = tokenResult.data.token;
            } else {
                return res
                    .status(tokenResult.data?.code)
                    .json(tokenResult.data);
            }
        }
        const result = await axios.get('http://localhost:8081/v1/test', {
            headers: {
                authorization: req.session.jwt,
            },
        });
        return res.json(result.data);
    } catch (error) {
        console.error(error);
        if (error.response?.status === 419) {
            return res.json(error.response.data);
        }
        return next(error);
    }
};

const request = async (req, api) => {
    try {
        if (!req.session.jwt) {
            const tokenResult = await axios.post(`${URL}/token`, {
                clientSecret: process.env.CLIENT_SECRET,
            });
            req.session.jwt = tokenResult.data.token;
        }
        return await axios.get(`${URL}${api}`, {
            headers: { authorization: req.session.jwt },
        });
    } catch (error) {
        if (error.response?.status === 419) {
            delete req.session.jwt; // 만료된 토큰 삭제
            return request(req, api); // 토큰이 만료되었으면 재귀함수로 다시 호출
        }
        return error.response; // return일때는 성송으로 표시되어 data. 메세지가 다 보이고
        // throw일때는 catch로 이동하게 되어 status 코드만 뜸
    }
};

exports.getMyPosts = async (req, res, next) => {
    try {
        const result = await request(req, '/posts/my');
        res.json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.searchByHashtag = async (req, res, next) => {
    try {
        const result = await request(
            req,
            `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
        );
        res.json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.renderMain = (req, res) => {
    res.render('main', { key: process.env.CLIENT_SECRET });
};
