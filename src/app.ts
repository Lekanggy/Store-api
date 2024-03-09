import express from "express";
import config from 'config'
import connect from '../src/utils/connect'
import logger from '../src/utils/logger'
import Routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express()
const port = config.get<number>("port")
const routes = new Routes(app)

app.use(express.json())

app.use(deserializeUser)

//Routes
routes.createUser();
routes.healthCheck();
routes.createSession();
routes.getSession();
routes.deleteSession();
routes.createProduct();
routes.getProduct();
routes.deleteProduct();
routes.updateProduct();

//Start server
app.listen(port, async()=>{
    await connect()
    logger.info(`App is running at port: ${port}`)
    
})