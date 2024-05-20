import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserSettingsController } from "./user-settings.controller";
import { join } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_SETTINGS_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: "userSettings",
          protoPath: join(
            __dirname,
            "../proto/user-settings/user-settings.proto",
          ),
        },
      },
    ]),
  ],
  controllers: [UserSettingsController],
  providers: [],
})
export class UserSettingsModule {}
