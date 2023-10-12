import { Request, Response, NextFunction } from "express"
import { ApplicationError } from "../error"
export default (err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApplicationError) {
    return res.status(err.code).json({ message: err.message })
  }
  console.log("middleware", err)

  res.status(500).json({ message: "Internal Server Error" })
}
