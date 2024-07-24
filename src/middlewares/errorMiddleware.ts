import BadRequest from "@/errors/BadRequest";
import NotFound from "@/errors/NotFound";
import Unauthorized from "@/errors/Unauthorized";
import { HttpStatus } from "@/utils/HttpsStatus";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    //console.log(err);

    if(err instanceof JsonWebTokenError){
      return res.status(401).json({
        status: "error",
        error: {
            code: 401,
            message: err.message
        }
      })
    }

    if (err instanceof ZodError) {
      const issues = err.issues.map(issue => ({
            message: issue.message,
            path: issue.path
      }))

      return res.status(400).json({
        error: {
            code: 400,
            data: issues.length > 1 ? issues : issues[0]
        }
      });
  }

  if (err instanceof NotFound) {
      return res.status(err.statusCode).json({
        status: "error",
        error: {
            code: err.statusCode,
            message: err.message
        }
      })
  }

  if (err instanceof BadRequest) {
    return res.status(err.statusCode).json({
        status: "error",
        error: {
            code: err.statusCode,
            message: err.message
        }
      })
  }

  if (err instanceof Unauthorized) { 
    return res.status(err.statusCode).json({
        status: "error",
        error: {
            code: err.statusCode,
            message: err.message
        }
      })
  }


  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      error: {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message ? err.message : "Erro interno do servidor. Por favor, tente novamente mais tarde.",
      }
  });
  }