const axios = require('axios');

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
