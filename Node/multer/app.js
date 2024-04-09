const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('zerochpassword'));

app.use(
    session({
        // 세션일 때 항상 세션쿠키를 사용하기 때문
        resave: false,
        saveUninitialized: false,
        secret: 'zerochpassword',
        cookie: {
            httpOnly: true, // XSS 공격을 막기 위해 true로 설정
        },
        name: 'connect.sid',
    })
); // 로그인한 사람까지만 / 경로의 페이지를 보여주고 싶을 때 순서

const multer = require('multer');
const fs = require('fs');

// 서버에서 sync를 사용하는 경우는 드물지만 서버 시작전에 Sync를 사용하여 uploads 폴더가 없으면 만드는 것은 좋음
try {
    fs.readFileSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        // 업로드한 파일을 어디에 저장할 것인지 설정
        // 디스크에 저장 또는 메모리에 저장하는 것이 가능
        destination(req, file, done) {
            done(null, 'uploads/'); // done의 첫번째 자리는 보통 에러처리 미들웨어가 들어감
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // 확장자 추출
            done(
                null,
                path.basename(file.originalname, ext) + Date.now() + ext // 이름 형식 설정, 날짜를 지정해주지 않으면 이름이 같으면 덮어씌워버림
            );
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 mb 파일만 업로드 가능, 이상이면 400번때 오류가 남
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

// 하나만 업로드할 때
// app.post('/upload', upload.single('image'), (req, res) => {
//     // 특정 라우터에서만 일어나기 때문에 upload.single()를 미들웨어처럼 적용
//     console.log(req.file);
//     res.send('ok');
// });

// 여러개를 업로드할 때(이미지가 multiful일 때)
// app.post('/upload', upload.array('image'), (req, res) => {
//     // 특정 라우터에서만 일어나기 때문에 upload.array()(여러개)를 미들웨어처럼 적용
//     console.log(req.files); // 따라서 files에 들어감
//     res.send('ok');
// });

// 여러개를 업로드할 때(이미지 선택을 여러개 할 때)
// app.post(
//     '/upload',
//     upload.fields(
//         { name: 'image1', limits: 5 }, // 최대 5까까지 한번에 올라감
//         { name: 'image2' },
//         { name: 'image3' }
//     ),
//     (req, res) => {
//         // 특정 라우터에서만 일어나기 때문에 upload.fields()(여러개)를 미들웨어처럼 적용
//         console.log(req.files.image1); // 따라서 files에 들어감
//         console.log(req.files.image2);
//         console.log(req.files.image3);
//         res.send('ok');
//     }
// );

app.post('/upload', upload.none(), (req, res) => {
    req.body.title;
    res.send('ok');
});

app.get(
    '/',
    (req, res, next) => {
        console.log('GET / 요청에서만 실행됩니다.');
        next();
    },
    (req, res) => {
        throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
    }
);

// 에러처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
