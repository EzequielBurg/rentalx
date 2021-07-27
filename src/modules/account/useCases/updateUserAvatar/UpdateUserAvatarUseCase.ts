import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/implementations/IUsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ avatarFile, userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    const userUpdated = await this.usersRepository.updateAvatar(user);

    delete userUpdated.password;

    return userUpdated;
  }
}
