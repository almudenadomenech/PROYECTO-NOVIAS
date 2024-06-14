import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Category } from './category.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Controller('category')
export class CategoryController {
  
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
){}

@Get()
findAll() {
    return this.categoryRepository.find();
}

@Get(':id')
findById( @Param('id', ParseIntPipe) id: number ) {
    return this.categoryRepository.findOne({
        where: {
            id: id
        }
    });
}

}
