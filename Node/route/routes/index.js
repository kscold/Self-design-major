const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (res, req) => {
    // 여기서의 get() 메서드는 http get 메서드임
    res.send('Hello Express');
});

module.exports = router;
