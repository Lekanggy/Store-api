import { FilterQuery } from "mongoose"
import UserModel, { UserDocument } from "../model/user.model"
export async function createUser(input:any) {
    try {
        return await UserModel.create(input)
    } catch (error) {
        throw new Error()
    }
}

export async function validateUserPassword({email, password}:{email:string, password: string}) {
   
    const user = await UserModel.findOne({email})

    if(!user){
        return false
    }

    const isValid = await user.comparePassword(password)

    if(!isValid) return false

    return user
}

export async function findUser(query: FilterQuery<UserDocument>) {
    console.log("us", query)
    return UserModel.findOne(query).lean()
}