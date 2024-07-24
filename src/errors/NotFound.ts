import { HttpStatus } from '@/utils/HttpsStatus';
import HttpError from './HttpError';

export default class NotFound extends HttpError {
  constructor(message: string = "Beneficiário não encontrado") {
    const statusCode = HttpStatus.NOT_FOUND;
    super(statusCode, message);
  }
}
