import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: "localhost:5000",
      protoPath: join(__dirname, "./proto/user/user.proto"),
      package: "user",
    },
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: "localhost:5001",
      protoPath: join(__dirname, "./proto/user-settings/user-settings.proto"),
      package: "userSettings",
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
