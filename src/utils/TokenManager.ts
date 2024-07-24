import { userPayload } from "@/types/middlewares/IRequestToken"
import  jwt, { Secret } from "jsonwebtoken"


interface DataToken {
    info: userPayload
}

export const tokenManager = {
    createToken: (data: DataToken, expiresIn: string): string => {
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY as Secret, {
            expiresIn
        })

        return token
    },

    getPayload: (token: string): DataToken => {
        try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret)

        return payload as DataToken
    } catch(err) {
        throw err
    }
    }
}