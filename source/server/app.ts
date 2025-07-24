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

  //Redirecting www domains to non-www domains
  mtdServer.use((req, res, next) => {
    const redirects: Record<string, string> = {
      'www.morethandevs.com': 'https://morethandevs.com',
      'www.martinerlandsson.com': 'https://martinerlandsson.com',
    }
    if (redirects[req.hostname]) return res.redirect(301, `${redirects[req.hostname]}${req.url}`)
    next()
  });

  //Setting up the routing for the different domains
  routeMore(mtdServer)
  routeMartin(mtdServer)
  routeBirdy(mtdServer)

  //Redirect www domains to non-www domains
  mtdServer.use((req, res, next) => {

    if (req.hostname === 'www.martinerlandsson.com') {
      return res.redirect(301, `https://martinerlandsson.com${req.url}`);
    }
    next();
  });


  // 404 Middleware
  mtdServer.use((req, res, next) => {
    LogItem({ title: "404", message: "Requested resource wasn't found: " + req.path })
    return res.status(404).json({ message: 'Not Found' });
  });


  //Starting the server
  const port = process.env.PORT || 3000
  mtdServer.listen(port, () => {
    LogItem({ title: "Server listening", message: "Server is listening on port: " + port })
  })

})

