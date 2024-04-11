- [[노드(Node.js)]]에서 [[SQL]] 작업을 쉽게 할 수 있도록 도와주는 라이브러리([[모듈(Module)]])로 [[ORM(Object Relational Mapping)]]를 통해 여러 [[SQL]]류의 [[관계형 데이터베이스(Relational DataBase)]]와도 호환된다.

- 즉, 자바스크립트 문법으로도 [[데이터베이스(DataBase)]] 조작이 가능하다.

- 작은 프로젝트에서 사용하기는 매우 용이하다.

## 시퀄라이즈 설치

```bash
yarn add express morgan nunjucks sequelize sequelize-cli mysql2 
```

### 시퀄라이즈 구조 생성

- npx sequelize init 명령어를 통해 시퀄라이즈 구조를 생성한다.

- 이후 생성되는 models 디렉토리 안의 index.js에 내용을 아래와 같이 수정한다.
- mysql 기준 연결 버전이다.
 
```js
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// new Sequelize는 클래스 객체이기 때문에 인스턴스화를 여러개를 시킨다면 2개 이상의 mysql에 접속도 가능함
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

module.exports = db;
```

- config/congin.json에 실제 development에 실제 mysql에 대한 정보를 연결한다.

```json
{
	"development": {
		"username": "root",
		"password": "Tmdcks6502@",
		"database": "nodejs",
		"host": "127.0.0.1",
		"dialect": "mysql"
	},
	...
}
```