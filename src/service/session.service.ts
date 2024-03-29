import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../model/session.model";
import { verifyJwt, signJwt, publicKey } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from 'config'

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({user: userId, userAgent})
    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
  }
  

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
  ) {
    return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
    refreshToken,
  }: {
    refreshToken: string;
  }) {
    const { decoded } = verifyJwt(refreshToken);

    //console.log("insedre", get(decoded, "session"))
   // console.log("decoede", decoded)
  
    if (!decoded || !get(decoded, "session")) return false;
  
    const session = await SessionModel.findById(get(decoded, "session"));
   
    if (!session || !session.valid) return false;
  
    const user = await findUser({ _id: session.user });
    //console.log("see req", user)
  
  
    if (!user) return false;
  
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );
  
    return accessToken;
}