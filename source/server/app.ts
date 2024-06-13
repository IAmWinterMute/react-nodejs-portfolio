import express from 'express'
import { connectToMongoDB } from './boot/db.js'
import { LogItem } from './models/dbLog.js'
import helmet from 'helmet'
import { routeBirdy, routeMartin, routeMore } from './boot/routing.js'
import { validateEnvironmentVariables } from './boot/validation.js'

//Init the server
const mtdServer = express()

//Startup and validate Environment Variables
if (!validateEnvironmentVariables()) process.exit()

//Connect mongoose to the MongoDB
console.log("Connecting to DB")
connectToMongoDB().then(ok => {

  //Logging the start
  LogItem({ title: "System booting", message: "Booting on " + process.env.COMPUTERNAME + " with NODE_ENV:" + process.env.NODE_ENV })

  //Activate helmet for higher security
  mtdServer.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"] //Allowing external images (loading bird images)
    }
  }))

  //Setting up the routing
  routeMore(mtdServer)
  routeMartin(mtdServer)
  routeBirdy(mtdServer)

  // 404 Middleware
  mtdServer.use((req, res, next) => {
    return res.status(404).json({ message: 'Not Found' });
  });


  //Starting the server
  const port = process.env.PORT || 3000
  mtdServer.listen(port, () => {
    LogItem({ title: "Server listening", message: "Server is listening on port: " + port })
  })

})

