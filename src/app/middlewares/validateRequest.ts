import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Data validation check using zod
      // If everything alright next()
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (err) {
      // If checking failed send the error to globalErrorHandler
      next(err);
    }
  };
};

export default validateRequest;
