import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepositoy";
import { deleteFile } from "@utils/file";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepositoru: IUsersRepository
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepositoru.findById(userId);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.usersRepositoru.create(user);
  }
}

export { UpdateUserAvatarUseCase };
