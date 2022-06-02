import * as express from 'express'
import 'dotenv/config'

const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3030)
app.get('/', (req, res) => {
  res.send("ts-practice 서버 가동중🚀")
})

app.listen(app.get('port'), () => {
  console.log(`server is running on ${process.env.PORT} 🚀`)
})