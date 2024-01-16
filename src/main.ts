import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';

import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

// import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import responseTime from 'response-time';
import * as process from 'process';
import * as bodyParser from 'body-parser';
import { LoggingInterceptor } from './helper/interceptor/request-logging';
import { ResponseTransformInterceptor } from './helper/interceptor/request-transformation';

process.env.TZ = 'UTC';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(responseTime());

  app.use(bodyParser.json({ limit: '50mb' }));

  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseTransformInterceptor(),
  );

  //Handling for /new/ Path on live servers
  const swaggerPath = 'api/swagger';

  const config = new DocumentBuilder()
    .setTitle('Mylo Family Api Documentation')
    .setDescription('Mylo Backend Service for App and Web Written in Nest.js')
    .setVersion('1.0')
    .addBearerAuth();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Mylo API Docs',
    customfavIcon:
      'https://images.myloapp.in/mydo_upload/mydo_upload_1625802074_1174352256.png',
  };

  SwaggerModule.setup(
    swaggerPath,
    app,
    SwaggerModule.createDocument(app, config.build()),
    customOptions,
  );
  await app.listen(3000);
  console.info(`Service started at : http://127.0.0.1:3000`);
  console.info(
    `Api documentation available at : http://127.0.0.1:3000/${swaggerPath}`,
  );
}

bootstrap();
