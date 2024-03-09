import { Response , Request} from "express";
import logger from '../utils/logger'
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createUserHandler(req:Request<{}, {}, CreateUserInput>, res: Response){
   
    try {
        const user = await createUser(req.body)
        //console.log("inside", user)
        return res.json({data: omit(user.toJSON(), "password"), message: "User created successfully"})
    } catch (e:any) {
        logger.error(e.error)
        return res.status(409)
    }
}