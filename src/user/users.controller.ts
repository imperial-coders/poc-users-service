import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UsersController {
  @GrpcMethod('UsersService', 'GetUser')
  async getUser(
    data: UserById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): User {
    // TODO => users prisma service await a function there
    const mockedUSers = [
      {
        id: 'aea7212c-2905-491c-a280-7517b32c11c6',
        email: 'test@test.com',
        firstName: 'Darth',
        lastName: 'Vader',
      },
    ];
    return mockedUSers.find(({ id }) => id === data.id);
  }
}
