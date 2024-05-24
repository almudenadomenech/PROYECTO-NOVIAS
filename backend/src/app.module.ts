import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VestidosController } from './vestidos/vestidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vestidos } from './vestidos/vestidos.model';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'novias',
      entities: [Vestidos],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([Vestidos])
  ],
  controllers: [AppController, VestidosController],
  providers: [AppService],
})
export class AppModule {}
