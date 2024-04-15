import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.use(cors()); // Enable CORS for all routes
  await app.listen(3000);
}
main();
