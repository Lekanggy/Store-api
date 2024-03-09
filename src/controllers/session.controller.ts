import { Response , Request} from "express";
import { validateUserPassword } from "../service/user.service";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from 'config'

export async function createSessionHandler(req:Request, res:Response) {
    //Validate user password
    const user = await validateUserPassword(req.body)

    if(!user){
        return res.status(401).send("Invalid user password or email")
    }

    //Create session
    const session = await createSession(user._id, req.get("user-agent") || "")

    //Create token access
    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")}
    )

    //Create refresh Token
    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("refreshTokenTtl")}
    )

    return res.send({accessToken, refreshToken});
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    //console.log("id", res.locals.user)
    const userId = res.locals.user._doc?._id || res.locals.user?._id;

    //console.log("id", res.locals.user)

    const sessions = await findSessions({ user: userId, valid: true });
    //console.log("id", sessions)
  
    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    //console.log("see", sessionId)
  
    await updateSession({ _id: sessionId }, { valid: false });
  
    return res.send({
      accessToken: null,
      refreshToken: null,
    });
}