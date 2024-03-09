import { Express, Request, Response } from "express";
import validate from "./middleware/validateResource";
import { createUserHandler } from "./controllers/user.controller";
import { createUserSchema } from "./schema/user.schema";
import { createSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controllers/session.controller";
import { SessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controllers/product.controller";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";

interface RoutesInterface{
    healthCheck: ()=> Express
}

export default class Routes implements RoutesInterface{
   private app;
    constructor(param:Express){
        this.app = param
    }

    private mine(){
        
    }

    public healthCheck(){
        return this.app.get('/healthcheck', 
            (req:Request, res:Response)=> res.sendStatus(200)
        )
    }

    public createUser(){
     return this.app.post('/api/users', 
            validate(createUserSchema), 
           createUserHandler
        )
    }
    public createSession(){
        return this.app.post('/api/sessions', validate(SessionSchema), createSessionHandler)
    }

    public getSession(){
        return this.app.get('/api/sessions',requireUser, getUserSessionsHandler)
    }
    public deleteSession(){
        return this.app.delete('/api/sessions',requireUser, deleteSessionHandler)
    }

    public createProduct (){
        return this.app.post(
            "/api/products",
            [requireUser, validate(createProductSchema)],
            createProductHandler
          );
    }

    public updateProduct(){
        return this.app.put(
            "/api/products/:productId",
            [requireUser, validate(updateProductSchema)],
            updateProductHandler
          );
    }

    public getProduct(){
        return this.app.get(
        "/api/products/:productId",
        validate(getProductSchema),
        getProductHandler
      );
    }
    
      public deleteProduct(){
        return this.app.delete(
        "/api/products/:productId",
        [requireUser, validate(deleteProductSchema)],
        deleteProductHandler
      );
    }
}

