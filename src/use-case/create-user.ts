import { User } from "../domain/user.entity"
import { UserRepository } from "../repositories/user.repository"
import { singleton } from "tsyringe"
import { UserCreateInput } from "../controller/index"

export interface ICreateUserUseCase {
  execute(user: UserCreateInput): Promise<User>
}

@singleton()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository
    // DIをしない場合はここでUserRepositoryをインスタンス化する
  }
  async execute(user: UserCreateInput) {
    return await this.userRepository.save(user)
  }
}
