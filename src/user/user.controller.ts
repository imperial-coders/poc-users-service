import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import {
  CreateUserRequest,
  GetUserRequest,
  GetUsersRequest,
  SearchUsersRequest,
  SearchUsersResponse,
  UpdateUserRequest,
  User,
  UserServiceController,
  UserServiceControllerMethods,
} from "src/proto/user/user";
import { UserService } from "./user.service";

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  private readonly logger = new Logger(UserController.name);
  private userService = new UserService();

  @GrpcMethod("UserService", "getUser")
  async getUser(request: GetUserRequest): Promise<User> {
    this.logger.log(request);

    const user = await this.userService.getUser(request.id);

    if (!user) {
      return Promise.reject("Invalid user id");
    }

    return {
      ...user,
      phoneNumber: user.phoneNumber ?? undefined,
      createdAt: user.createdAt.toUTCString(),
      updatedAt: user.updatedAt.toUTCString(),
    };
  }

  @GrpcMethod("UserService", "getUsers")
  async getUsers(request: GetUsersRequest): Promise<SearchUsersResponse> {
    this.logger.log(request);

    const users = await this.userService.getUsers(request.ids);

    return {
      total: users.length,
      // TODO => nullable in proto?
      results: users.map((user) => ({
        ...user,
        phoneNumber: user.phoneNumber ?? undefined,
        createdAt: user.createdAt.toUTCString(),
        updatedAt: user.updatedAt.toUTCString(),
      })),
    };
  }

  @GrpcMethod("UserService", "searchUsers")
  async searchUsers(request: SearchUsersRequest): Promise<SearchUsersResponse> {
    this.logger.log(request);
    const response = await this.userService.searchUsers({ ...request });

    return {
      ...response,
      results: response.results.map((user) => ({
        ...user,
        phoneNumber: user.phoneNumber ?? undefined,
        createdAt: user.createdAt.toUTCString(),
        updatedAt: user.updatedAt.toUTCString(),
      })),
    };
  }

  @GrpcMethod("UserService", "createUser")
  async createUser(request: CreateUserRequest): Promise<User> {
    this.logger.log(request);
    const newUser = await this.userService.createUser({ ...request });

    return {
      ...newUser,
      phoneNumber: newUser.phoneNumber ?? undefined,
      createdAt: newUser.createdAt.toUTCString(),
      updatedAt: newUser.updatedAt.toUTCString(),
    };
  }

  @GrpcMethod("UserService", "updateUser")
  async updateUser(request: UpdateUserRequest): Promise<User> {
    this.logger.log(request);
    const updatedUser = await this.userService.updateUser({ ...request });

    return {
      ...updatedUser,
      phoneNumber: updatedUser.phoneNumber ?? undefined,
      createdAt: updatedUser.createdAt.toUTCString(),
      updatedAt: updatedUser.updatedAt.toUTCString(),
    };
  }

  // get it running and hit the endpoints
  // push up and begin working to get the client connected to this
}
