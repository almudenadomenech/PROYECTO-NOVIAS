import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VestidosController } from './vestidos/vestidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vestidos } from './vestidos/vestidos.model';
import { BookingController } from './booking/booking.controller';
import { Booking } from './booking/booking.model';
import { UsersController } from './users/users.controller';
import { User } from './users/users.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4} from 'uuid';
import { extname } from 'path';
import { JwtValidator } from './users/jwt.validator';
import { CategoryController } from './category/category.controller';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'admin',
      signOptions: {expiresIn: '7d'}
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        
        filename: (req, file, callback) => {
          let fileName = uuidv4() + extname(file.originalname);
          callback(null, fileName);
        }
      })
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'novias',
      entities: [Vestidos, Booking, User],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([Vestidos, Booking, User])
  ],
  controllers: [AppController, VestidosController, BookingController, UsersController, CategoryController],
  providers: [AppService, JwtValidator],
})
export class AppModule {}
