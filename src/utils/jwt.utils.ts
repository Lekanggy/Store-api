import jwt from 'jsonwebtoken'
import config from 'config'

import * as path from 'node:path';
import * as fs from 'node:fs';


export const privateKey = fs.readFileSync(path.join(__dirname, '../../private.key'), 'utf8');
export const publicKey = fs.readFileSync(path.join(__dirname, '../../public.key'), 'utf8');
//console.log(privateKey)

// const privateKey = config.get<string>("privateKey")
// const publicKey = config.get<string>("publicKey")


export function signJwt(object: Object, options?: jwt.SignOptions | undefined){

    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm:"RS256"
    })
}

export function verifyJwt(token:string){
    
    try {
        const decoded = jwt.verify(token, publicKey)
        //console.log("de2", decoded)
        return{
            valid: true,
            expired: false,
            decoded: decoded
        }
    } catch (e:any) {
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        }
    }
}

export async function generateRand(){
    const nanoid = await import("nanoid")

    return nanoid.customAlphabet("abcdefghijklmnop0123456789", 10)
}