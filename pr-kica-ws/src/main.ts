import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalService } from './global.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(GlobalService.loggedUser);

}
bootstrap();

