import { NextFunction, Response } from 'express';
import Unauthorized from '@/errors/Unauthorized';
import { RequestToken } from '@/types/middlewares/IRequestToken';
import { tokenManager } from '@/utils/TokenManager';


export const auth = async (req: RequestToken, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw new Unauthorized('Token não informado!'); 
    const tokenType = token.split(' ')[0]
    const finalToken = token.split(' ')[1];

    if(tokenType !== 'Bearer') throw new Unauthorized("Tipo de token inválido!")

    const decoded = tokenManager.getPayload(finalToken)

    req.user = decoded.info
    
    next();
  } catch (err) {
    next(err);
  }
};





