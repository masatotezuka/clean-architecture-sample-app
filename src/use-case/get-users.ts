import { singleton } from "tsyringe"
import { User } from "../domain/user.entity"
import { UserRepository } from "../repositories/user.repository"

export interface IGetUsersUseCase {
  execute(): Promise<User[]>
}

@singleton()
export class GetUsers implements IGetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll()
  }
}
