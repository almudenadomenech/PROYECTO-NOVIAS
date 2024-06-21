import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VestidoFiesta } from './vestidos-fiesta.model';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('vestidos-fiesta')
export class VestidosFiestaController {
    constructor (@InjectRepository(VestidoFiesta)
private vestidosFiestaRepository: Repository<VestidoFiesta>){}

@Get()
findAll(){
 return this.vestidosFiestaRepository.find();
}

@Get(':id')
findById(@Param('id', ParseIntPipe) id: number){
 return this.vestidosFiestaRepository.findOne({
     where: {
         id: id
     }
 });
}
@Get('filter-by-category-id/:id')
findByCategoryId(@Param('id', ParseIntPipe) id:number) {
 return this.vestidosFiestaRepository.find({
     where: {
         categories: {
             id: id
         }
     }
 });
}

 @Get('filter-by-price')
 findByPrice(@Param('id', ParseIntPipe) id: number){
     return this.vestidosFiestaRepository.findOne({
         where: {
             price: id
         }
     });
 }

 @Get('filter-by-photoUrl')
 findByPhotoUrl(@Param('id', ParseIntPipe) id: string) {
     return this.vestidosFiestaRepository.find({
         where: {
             photoUrl: id
         }
     });
 }

  @Get('filter-by-corte')
 findByCorte(@Param('id', ParseIntPipe) id: string) {
     return this.vestidosFiestaRepository.find({
         where: {
             corte: id
         }
     });
 } 

 @Get('filter-by-model')
 findByModel(@Param('id', ParseIntPipe) id: string) {
     return this.vestidosFiestaRepository.find({
         where: {
             model: id
         }
     });
 } 
 @Get('filter-by-description')
 findByDescription(@Param('id', ParseIntPipe) id: string) {
     return this.vestidosFiestaRepository.find({
         where: {
             description: id
         }
     });
 }

 @Get('filter-by-escote')
 findByEscote(@Param('id', ParseIntPipe) id: string) {
     return this.vestidosFiestaRepository.find({
         where: {
             escote: id
         }
     });
 }

 @Get('filter-by-mangas')
 findByTipoCola(@Param('id', ParseIntPipe) id: string) {
     return this.vestidosFiestaRepository.find({
         where: {
             mangas: id
         }
     });
 }

 @Get('filter-by-tejidos')
 findByTejidos(@Param('id', ParseIntPipe) id: string) {
     return this.vestidosFiestaRepository.find({
         where: {
             tejidos: id
         }
     });
 }

 @Get('filter-by-espalda')
 findByEspalda(@Param('id', ParseIntPipe) id: string) {
     return this.vestidosFiestaRepository.find({
         where: {
             espalda: id
         }
     });
 }

 @Get('filter-by-talle')
 findByTalle(@Param('id', ParseIntPipe) id: string) {
     return this.vestidosFiestaRepository.find({
         where: {
             talle: id
         }
     });
 }

 @Get('filter-by-talla')
 findByTalla(@Param('id', ParseIntPipe) id: string) {
     return this.vestidosFiestaRepository.find({
         where: {
             tallas: id
         }
     });
 }

 @Post()
 @UseInterceptors(FileInterceptor('file'))
 async create(@UploadedFile() file: Express.Multer.File,
 @Body() vestidosFiesta: VestidoFiesta,
){

     if (file) {
         vestidosFiesta.photoUrl = file.filename;
     }
     return await this.vestidosFiestaRepository.save(vestidosFiesta);
 }

 @Put(':id')
 @UseInterceptors(FileInterceptor('file'))
 @UsePipes(new ValidationPipe({ transform: true }))
 async update(
     @UploadedFile() file: Express.Multer.File,
     @Param('id', ParseIntPipe) id: number,
     @Body() vestidosFiesta: VestidoFiesta
     ) {

         if(!await this.vestidosFiestaRepository.existsBy({id: id})) {
             throw new NotFoundException('House not found');
         }

         if (file) {
             vestidosFiesta.photoUrl = file.filename;
         }
         vestidosFiesta.id = id; 
    
         return await this.vestidosFiestaRepository.save(vestidosFiesta);

 }

 @Delete(':id')
async deleteById(
 @Param('id', ParseIntPipe) id: number
) {
 const exists = await this.vestidosFiestaRepository.existsBy({ id: id });

 if (!exists) {
     throw new NotFoundException('Vestido not found');
 }

 try {
     const vestidos = await this.vestidosFiestaRepository.findOne({ where: { id: id } });
     await this.vestidosFiestaRepository.remove(vestidos);
 } catch (error) {
     console.log("Error al borrar el vestido", error);
     throw new ConflictException('No se puede borrar.');
 }
}
}

 




