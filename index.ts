// Import required modules
import Koa from 'koa';
import Router from 'koa-router'
import render from "@koa/ejs"
import type { Context } from 'koa';
import { koaBody } from 'koa-body';
// import * as koaRespond from 'koa-respond';
import logger from 'koa-logger'
import serve from 'koa-static'
import path from "path";
import fs from 'fs/promises'
import { fileURLToPath } from 'url';
import { hashPassword } from './src/lib/password';
import loginRoute from './src/routes/login';
import { handleRegistration } from './src/routes/register';
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
  
  .use(koaBody())

  // .use(render())
  
  .use(logger())
  
  // .use(respond())
  
  
  .use(router.routes())
  
  .use(router.allowedMethods())
//app.use(morgan('dev'));
const views = path.join(__dirname, 'src/views')
// Serve the UI
const indexPath = path.join(views, 'index.html')

router.get('/', async (ctx) => {
  // if(validUser){
  ctx.render('index')
})

// Route to handle user login
router.post('/login',  (ctx: Context) => loginRoute(ctx))

// Route to check if a user is authenticated
router.get('/register', (ctx) => handleRegistration(ctx)) 

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
