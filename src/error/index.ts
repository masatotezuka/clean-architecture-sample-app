import { StatusCodes } from "http-status-codes"

export class ApplicationError extends Error {
  constructor(message: string, readonly code: StatusCodes) {
    super(message)
    this.name = this.constructor.name
    this.code = code
  }
}
