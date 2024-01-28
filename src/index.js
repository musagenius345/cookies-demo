// Import required modules
import Koa from 'koa';
import Router from 'koa-router'
import { koaBody } from 'koa-body';
import logger from 'koa-logger'
import serve from 'koa-static'
import path from "path";
import fs from 'fs/promises'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
//import morgan from 'morgan'
// Get the directory name using import.meta.url
debugger
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Create an Express app
const app = new Koa();
const router = new Router()

// Serve static files from the 'public' directory
app.use(serve(path.join(__dirname, 'public')))
// Middleware to parse incoming JSON and cookies
app.use(koaBody())
   .use(logger())
   .use(router.routes())
   .use(router.allowedMethods())
  .use(cookieParser());
//app.use(morgan('dev'));
const views = path.join(__dirname, 'views')
// Serve the UI
const indexPath = path.join(views, 'index.html')

router.get('/', async (ctx) => {
  const loginPage = await fs.readFile(indexPath)
  ctx.type = 'html'
  ctx.body = loginPage  
})

// Route to handle user login
router.post('/login', (ctx) => {

});

// Route to check if a user is authenticated
router.get('/profile', (ctx) => {
}) 

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
