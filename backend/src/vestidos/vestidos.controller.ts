import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vestidos } from './vestidos.model';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('vestidos')
export class VestidosController {
    constructor(@InjectRepository(Vestidos)
    private vestidosRepository: Repository<Vestidos>) {}

   @Get()
   findAll(){
    return this.vestidosRepository.find();
   }

   @Get(':id')
   findById(@Param('id', ParseIntPipe) id: number){
    return this.vestidosRepository.findOne({
        where: {
            id: id
        }
    });
}
    

    @Get('filter-by-descripcion')
    findByDescripcion(@Param('id', ParseIntPipe) id: string){
        return this.vestidosRepository.findOne({
            where: {
                descripcion: id
            }
        });
    }

    

   
    @Get('filter-by-price')
    findByPrice(@Param('id', ParseIntPipe) id: number){
        return this.vestidosRepository.findOne({
            where: {
                price: id
            }
        });
    }

    @Get('filter-by-photoUrl')
    findByPhotoUrl(@Param('id', ParseIntPipe) id: string) {
        return this.vestidosRepository.find({
            where: {
                photoUrl: id
            }
        });
    }

    @Get('filter-by-corte')
    findByCorte(@Param('id', ParseIntPipe) id: string) {
        return this.vestidosRepository.find({
            where: {
                corte: id
            }
        });
    }

    @Get('filter-by-escote')
    findByEscote(@Param('id', ParseIntPipe) id: string) {
        return this.vestidosRepository.find({
            where: {
                escote: id
            }
        });
    }

    @Get('filter-by-tipoCola')
    findByTipoCola(@Param('id', ParseIntPipe) id: string) {
        return this.vestidosRepository.find({
            where: {
                tipoCola: id
            }
        });
    }

    @Get('filter-by-tejidos')
    findByTejidos(@Param('id', ParseIntPipe) id: string) {
        return this.vestidosRepository.find({
            where: {
                tejidos: id
            }
        });
    }

    @Get('filter-by-espalda')
    findByEspalda(@Param('id', ParseIntPipe) id: string) {
        return this.vestidosRepository.find({
            where: {
                espalda: id
            }
        });
    }

    @Get('filter-by-talle')
    findByTalle(@Param('id', ParseIntPipe) id: string) {
        return this.vestidosRepository.find({
            where: {
                talle: id
            }
        });
    }

    @Get('filter-by-talla')
    findByTalla(@Param('id', ParseIntPipe) id: string) {
        return this.vestidosRepository.find({
            where: {
                tallas: id
            }
        });
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File,
    @Body() vestidos: Vestidos){

        if (file) {
            vestidos.photoUrl = file.filename;
        }
        return await this.vestidosRepository.save(vestidos);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @UploadedFile() file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number,
        @Body() vestidos: Vestidos
        ) {

            if(!await this.vestidosRepository.existsBy({id: id})) {
                throw new NotFoundException('House not found');
            }

            if (file) {
                vestidos.photoUrl = file.filename;
            }
            vestidos.id = id; 
       
            return await this.vestidosRepository.save(vestidos);
 
    }

    @Delete(':id')
async deleteById(
    @Param('id', ParseIntPipe) id: number
) {
    const exists = await this.vestidosRepository.existsBy({ id: id });

    if (!exists) {
        throw new NotFoundException('Vestido not found');
    }

    try {
        const vestidos = await this.vestidosRepository.findOne({ where: { id: id } });
        await this.vestidosRepository.remove(vestidos);
    } catch (error) {
        console.log("Error al borrar el vestido", error);
        throw new ConflictException('No se puede borrar.');
    }
}
}

    

   

