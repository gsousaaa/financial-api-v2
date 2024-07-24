import { HttpStatus } from '@/utils/HttpsStatus';
import HttpError from './HttpError';

export default class Unauthorized extends HttpError {
  constructor(message: string= "Não autorizado. Token de autenticação inválido ou ausente.") {
    const statusCode = HttpStatus.UNAUTHORIZED;
    super(statusCode, message);
  }
}
