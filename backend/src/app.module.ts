import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VestidosController } from './vestidos/vestidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vestidos } from './vestidos/vestidos.model';
import { BookingController } from './booking/booking.controller';
import { Booking } from './booking/booking.model';
import { UsersController } from './users/users.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'novias',
      entities: [Vestidos, Booking],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([Vestidos, Booking])
  ],
  controllers: [AppController, VestidosController, BookingController, UsersController],
  providers: [AppService],
})
export class AppModule {}
