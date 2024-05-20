import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { UserSettingsModule } from "./user-settings/user-settings.module";

@Module({
  imports: [UserModule, UserSettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
