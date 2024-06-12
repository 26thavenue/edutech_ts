import { User, Subscription } from "@prisma/client";


declare module 'express' {
    export interface Request {
        user?: User & {subscription: Subscription}

    }
}