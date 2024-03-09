import { FilterQuery } from 'mongoose';
import {object, string} from 'zod'
import SessionModel, { SessionDocument } from '../model/session.model';

export const SessionSchema = object({
    body: object({
        email: string({
            required_error: "email mis reqiured"
        }),
        password: string({
            required_error: "password"
        }),
    })
})
