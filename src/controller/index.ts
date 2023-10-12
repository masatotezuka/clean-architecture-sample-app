import express, { Request, Response, NextFunction } from "express"
import { CreateUserUseCase } from "../use-case/create-user"
import { validate } from "../middleware/validate"
import { container } from "tsyringe"
import { z } from "zod"
import { GetUsers } from "../use-case/get-users"
import { UpdateUserUseCase } from "../use-case/update-user"
import { DeleteUserUseCase } from "../use-case/delete-user"

const router = express.Router()

// tsyringeを使用しない場合はここでDIする
// const prisma = new PrismaClient()
// const userRepository: IUserRepository = new UserRepository(prisma)
// const createUserUseCase = new CreateUserUseCase(userRepository)

router.get(
  "/users",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await container.resolve(GetUsers).execute()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
)

export const UserCreateInputBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
})
export type UserCreateInput = z.infer<typeof UserCreateInputBodySchema>

router.post(
  "/users",
  validate({ bodySchema: UserCreateInputBodySchema }),
  async (
    req: Request<{}, {}, UserCreateInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await container.resolve(CreateUserUseCase).execute(req.body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

export const UserUpdateInputBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
})
export type UserUpdateRequestBody = z.infer<typeof UserUpdateInputBodySchema>

const IdSchema = z.object({ id: z.coerce.number().gt(0) })
router.put(
  "/users/:id",
  validate({ paramsSchema: IdSchema, bodySchema: UserUpdateInputBodySchema }),
  async (
    req: Request<{ id: string }, {}, UserUpdateRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await container
        .resolve(UpdateUserUseCase)
        .execute({ ...req.body, id: Number(req.params.id) })

      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  "/users/:id",
  validate({ paramsSchema: IdSchema }),
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      await container.resolve(DeleteUserUseCase).execute(Number(req.params.id))
      res.json({ success: true })
    } catch (error) {
      next(error)
    }
  }
)

export default router
