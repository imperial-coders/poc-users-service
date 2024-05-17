import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserRequest, User, UserServiceController } from 'src/proto/user';

@Controller()
export class UserController implements UserServiceController {
  private readonly logger = new Logger(UserController.name);

  @GrpcMethod('UserService', 'getUser')
  async getUser(request: GetUserRequest): Promise<User> {
    this.logger.log(request);

    // TODO => users prisma service await a function there
    const mockUser: User = {
      id: 'aea7212c-2905-491c-a280-7517b32c11c6',
      email: 'test@test.com',
      firstName: 'Darth',
      lastName: 'Vader',
      phoneNumber: '',
    };

    return Promise.resolve(mockUser);
  }
}
