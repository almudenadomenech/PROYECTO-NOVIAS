import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vestidos } from './vestidos.model';

@Controller('vestidos')
export class VestidosController {
    constructor(@InjectRepository(Vestidos)
    private vestidosRepository: Repository<Vestidos>){}

   @Get()
   findAll(){
    return this.vestidosRepository.find();
   }
}
