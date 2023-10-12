import { PrismaClient } from "@prisma/client"
import { User, IUserPersistBefore } from "../domain/user.entity"
import { UserCreateInput } from "../controller"
import { singleton } from "tsyringe"

const client = new PrismaClient()

export interface IUserRepository {
  findAll(): Promise<User[]>
  save(user: UserCreateInput): Promise<User>
  delete(id: number): Promise<void>
}

@singleton()
export class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    const users = await client.user.findMany()
    return users.map((user) => new User(user.id, user.name, user.email))
  }

  async save(user: IUserPersistBefore): Promise<User> {
    const newUser = await client.user.upsert({
      where: { id: "id" in user ? user.id : -1 },
      create: { name: user.name, email: user.email },
      update: { name: user.name, email: user.email },
    })
    return new User(newUser.id, newUser.name, newUser.email)
  }

  async delete(id: number): Promise<void> {
    await client.user.delete({ where: { id } })
  }
}
