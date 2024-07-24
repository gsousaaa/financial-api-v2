
import crypto from 'crypto'

export const hashPassword = (input: string) => {
    return crypto.createHash("md5").update(input).digest("hex")
};