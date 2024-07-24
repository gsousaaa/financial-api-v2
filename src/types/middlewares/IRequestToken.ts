import { Request } from 'express';

export interface userPayload {
  id: number,
  name: string,
  email: string,
  balance: number
}


export interface RequestToken extends Request {
    user?: userPayload
  }