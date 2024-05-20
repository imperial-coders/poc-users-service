import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import {
  GetUserSettingsRequest,
  GetUserSettingsByUserIdRequest,
  UserSettings,
  UserSettingsServiceController,
  UserSettingsServiceControllerMethods,
  UpdateUserSettingsRequest,
} from "src/proto/user-settings/user-settings";
import { UserSettingsService } from "./user-settings.service";

@Controller()
@UserSettingsServiceControllerMethods()
export class UserSettingsController implements UserSettingsServiceController {
  private readonly logger = new Logger(UserSettingsController.name);
  private userSettingsService = new UserSettingsService();

  @GrpcMethod("UserSettingsService", "getUserSettings")
  async getUserSettings(
    request: GetUserSettingsRequest,
  ): Promise<UserSettings> {
    this.logger.log(request);
    const userSettings = await this.userSettingsService.getUserSettings(
      request.id,
    );

    if (userSettings) {
      return {
        ...userSettings,
        createdAt: userSettings.createdAt.toUTCString(),
        updatedAt: userSettings.updatedAt.toUTCString(),
      };
    }

    return Promise.reject("Invalid user settings id");
  }

  @GrpcMethod("UserSettingsService", "getUserSettingsByUserId")
  async getUserSettingsBuUserId(
    request: GetUserSettingsByUserIdRequest,
  ): Promise<UserSettings> {
    this.logger.log(request);

    const userSettings = await this.userSettingsService.getUserSettingsByUserId(
      {
        userId: request.userId,
      },
    );

    if (userSettings) {
      return {
        ...userSettings,
        createdAt: userSettings.createdAt.toUTCString(),
        updatedAt: userSettings.updatedAt.toUTCString(),
      };
    }

    return Promise.reject("Invalid user id");
  }

  @GrpcMethod("UserSettingsService", "updateUserSettings")
  async updateUserSettings(
    request: UpdateUserSettingsRequest,
  ): Promise<UserSettings> {
    this.logger.log(request);

    const updatedUserSettings =
      await this.userSettingsService.updateUserSettings({
        ...request,
      });

    return {
      ...updatedUserSettings,
      createdAt: updatedUserSettings.createdAt.toUTCString(),
      updatedAt: updatedUserSettings.updatedAt.toUTCString(),
    };
  }
}
