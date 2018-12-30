export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public musicalGenre: string,
    public artists?: string[]
  ) {}
}
