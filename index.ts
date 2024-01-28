// Import required modules
import Koa from 'koa';
import Router from 'koa-router'
import { koaBody } from 'koa-body';
// import * as koaRespond from 'koa-respond';
import logger from 'koa-logger'
import serve from 'koa-static'
import path from "path";
import fs from 'fs/promises'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
import { hashPassword } from './src/lib/password';
import { isRegistered } from './src/lib/util';
//import morgan from 'morgan'
// Get the directory name using import.meta.url

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const { respond } = koaRespond

// Create an Express app
const app = new Koa();
const router = new Router()
let validUser = true
// Serve static files from the 'public' directory
app.use(serve(path.join(__dirname, 'public')))
// Middleware to parse incoming JSON and cookies
app.use(koaBody())
   .use(logger())
   // .use(respond())
   .use(router.routes())
   .use(router.allowedMethods())
//app.use(morgan('dev'));
const views = path.join(__dirname, 'src/views')
// Serve the UI
const indexPath = path.join(views, 'index.html')

router.get('/', async (ctx) => {
  if(validUser){
  const loginPage = await fs.readFile(indexPath)
  ctx.type = 'html'
  ctx.body = loginPage
  } else {
    ctx.status(401)
  }
})

// Route to handle user login
router.post('/login', (ctx) => {
  const {email, password } = ctx.request.body
  const hashedPassword = hashPassword(password)
  isRegistered()


});

// Route to check if a user is authenticated
router.get('/profile', (ctx) => {
}) 

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
