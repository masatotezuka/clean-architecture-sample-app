import { AnyZodObject } from "zod"
import { Request, Response, NextFunction } from "express"
import { ApplicationError } from "../error"
import { StatusCodes, getReasonPhrase } from "http-status-codes"

type ValidateArg = {
  paramsSchema?: AnyZodObject
  querySchema?: AnyZodObject
  bodySchema?: AnyZodObject
}

export const validate =
  (arg: ValidateArg) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paramsSchema, querySchema, bodySchema } = arg
      if (bodySchema) bodySchema.parse(req.body)
      if (paramsSchema) paramsSchema.parse(req.params)
      if (querySchema) querySchema.parse(req.query)
      return next()
    } catch (error) {
      console.log("validate", error)
      next(
        new ApplicationError(
          getReasonPhrase(StatusCodes.BAD_REQUEST),
          StatusCodes.BAD_REQUEST
        )
      )
    }
  }
