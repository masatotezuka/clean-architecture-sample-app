import { User } from "../domain/user.entity"
import { UserRepository } from "../repositories/user.repository"
import { singleton } from "tsyringe"
import { UserCreateInput } from "../controller/index"

export interface IUpdateUserUseCase {
  execute(user: UserUpdateInput): Promise<User>
}

// class UserUpdateInput {
//   readonly id: number
//   readonly name: string
//   readonly email: string
//   constructor(id: number, name: string, email: string) {
//     this.id = id
//     this.name = name
//     this.email = email
//   }
// }
export interface UserUpdateInput {
  id: number
  name: string
  email: string
}

@singleton()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository
  }
  async execute(user: UserUpdateInput) {
    return await this.userRepository.save(user)
  }
}
