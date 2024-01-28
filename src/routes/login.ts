import type { Context } from 'koa';


export default async function loginRoute(ctx: Context){
   const { email, password } = ctx.request.body
   console.log(email)
}
