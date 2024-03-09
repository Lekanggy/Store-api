import mongoose from "mongoose";
import config from 'config'
import logger from './logger'

async function connect() {
    const dburl = config.get<string>("dbUrl")

    try {
        await mongoose.connect(dburl)
        logger.info("DB is connected")
    } catch (error) {
        logger.error("DB not connected", error)
        process.exit(1)
    }
}

export default connect