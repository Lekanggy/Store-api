import { Response, Request, NextFunction } from "express"
import { AnyZodObject } from "zod"
const validate = (schema: AnyZodObject)=> (req:Request, res: Response, next:NextFunction)=>{
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        next();
    } catch (e:any) {
        return res.sendStatus(400).send(e.error)
    }
}

export default validate