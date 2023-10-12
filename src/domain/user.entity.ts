export class User {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly email: string
  ) {
    this.id = id
    this.name = name
    this.email = email
  }
}

export interface IUserPersistBefore {
  id?: number
  name: string
  email: string
}
