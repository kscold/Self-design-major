const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
} = require('worker_threads');

if (isMainThread) {
    // 메인스레드
    const threads = new Set(); // 집합을 선언
    threads.add(
        new Worker(__filename, {
            // Worker를 현재 폴더에서 초기 번호 1번을 줌
            workerData: { start: 1 },
        })
    );
    threads.add(
        new Worker(__filename, {
            workerData: { start: 2 },
        })
    );

    for (let worker of threads) {
        worker.on('message', (value) => console.log('워커로부터', value));
        worker.on('exit', () => {
            threads.delete(worker);

            if (threads.size === 0) {
                // 사이즈가 0이면 모든 일이 끝남
                console.log('워커 끝~');
            }
        });
    }
} else {
    // 워커스레드
    const data = workerData; // 보냈던 데이터를 받아옴
    parentPort.postMessage(data.start + 100); // 멀티스레드임으로 101, 102를 실행함
}
