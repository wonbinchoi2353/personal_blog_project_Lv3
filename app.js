const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.route');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());
app.use('/api', [usersRouter]);

app.listen(port, () => {
  console.log(port, '포트로 서버가 실행되었습니다.');
});
