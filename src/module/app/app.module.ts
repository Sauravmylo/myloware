import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DATABASE_INSTANCE } from 'src/config/database/database.constants';
import { VendorsModule } from '../vendors/vendor.module';
import { UtilModule } from '../util.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: DATABASE_INSTANCE.MASTER,
      useFactory: async () => {
        return <TypeOrmModuleOptions>{
          type: 'mysql',
          logging: false,
          charset: 'utf8mb4',
          host: '10.189.176.25',
          port: 3306,
          username: 'root',
          password: 'SQLdevelopers@mylo',
          database: 'myloware',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    VendorsModule,
    UtilModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
