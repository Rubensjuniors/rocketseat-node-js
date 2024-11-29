import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
    host: 'RENDER' in process.env ? '0.0.0.0' : 'localhost',
  })
  .then(() => {
    console.log('HTTP Server Running!!!🧸')
  })

// app.ready().then(() => {
//   const spec = app.swagger()

//   writeFile(
//     resolve('.', 'swagger.json'),
//     JSON.stringify(spec, null, 2),
//     'utf-8',
//   )
// })
