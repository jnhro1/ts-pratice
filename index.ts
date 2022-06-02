import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as passport from 'passport';
import * as hpp from 'hpp';
import helmet = require('helmet');
import 'dotenv/config';
import { sequelize } from './models';

const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3030);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('db 연결 성공✨');
  })
  .catch((err: Error) => {
    console.error(err);
  });

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  // app.use(cors({
  //   origin: /hostName/.com$/,
  //   credentials: true,
  // }))
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: prod ? '.nodebird.com' : undefined,
    },
    name: 'rnbck',
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('ts-practice 서버 가동중🚀');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('에러 발생!');
});

app.listen(app.get('port'), () => {
  console.log(`server is running on ${process.env.PORT} 🚀`);
});
