const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; // cpu 갯수만큼 알아낼 수 있음

if (cluster.isMaster) {
    // 마스터 스레드에서
    console.log(`마스터 프로세스 아이디: ${process.pid}`);

    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork(); // 쓰레드를 fork를 함
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        // cluster.fork(); // 다시 fork()를 하지 않으면 프로세스를 종료함
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(() => {
            process.exit(1); // 서버의 접속을 할 때마다 하나의 스레드를 종료
        }, 1000);
    }).listen(8080);

    console.log(`${process.pid}번 워커 실행`);
}
