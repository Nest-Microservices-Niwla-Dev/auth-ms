import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';

async function bootstrap() {
 
  // port 3004 env
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options:{
       servers: envs.natsServers
      }
   }
);

  app.useGlobalPipes( 
    new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true, 
    }) 
   );
   
   await app.listen();

}
bootstrap();
