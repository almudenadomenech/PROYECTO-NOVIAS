import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryFiesta } from './category-fiesta.model';
import { Repository } from 'typeorm';

@Controller('category-fiesta')
export class CategoryFiestaController {

    constructor(
        @InjectRepository(CategoryFiesta) 
        private categoryFiestaRepository: Repository<CategoryFiesta>){}
        @Get()
        findAll() {
            return this.categoryFiestaRepository.find();
        }
        
        @Get(':id')
        findById( @Param('id', ParseIntPipe) id: number ) {
            return this.categoryFiestaRepository.findOne({
                where: {
                    id: id
                }
            });
        }
           
}
