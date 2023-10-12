import { UserRepository } from "../repositories/user.repository"
import { singleton } from "tsyringe"

export interface IDeleteUserUseCase {
  execute(id: number): Promise<void>
}
@singleton()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository
  }
  async execute(id: number) {
    return await this.userRepository.delete(id)
  }
}
