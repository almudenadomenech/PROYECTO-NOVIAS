import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Query, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.model';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/users/role.model';

@Controller('booking')
export class BookingController {

    constructor(@InjectRepository(Booking)
    private bookingRepository: Repository<Booking>){}

    @Get()
    findAll(){
        return this.bookingRepository.find()
    }

  
    @Get('filter-by-photoUrl')
    findByPhotoUrl(@Param('id', ParseIntPipe) id: string) {
        return this.bookingRepository.find({
            where: {
                vestidos :{
                    photoUrl: id
                }
               
            }
        });
    }
  

    @Get('filter-by-id/:id')
        findById(@Param('id', ParseIntPipe) id :number){
            return this.bookingRepository.findOne({
                where: {
                    id: id
                }
            });
        } 

    @Get('filter-by-user/:id')
    findByUserId(@Param('id', ParseIntPipe) id: number){
        return this.bookingRepository.find({
            where: {
                user: {
                    id: id
                }
            }
        });
    }

   

    @Get('filter-by-vestidos/:id')
   findByVestidosId(@Param('id', ParseIntPipe) id: number){
    return this.bookingRepository.find({
        where: {
            user: {
                id: id
            }
        }
    });
   }
   
   @Get('filter-by-vestidosFiesta/:id')
   findByVestidosFiestaId(@Param('id', ParseIntPipe) id: number){
    return this.bookingRepository.find({
        where: {
            user: {
                id: id
            }
        }
    });
   }  

   @UseGuards(AuthGuard('jwt'))
    @Get('filter-by-current-user')
    findByCurrentUserId(@Request() request) {

        if (request.user.role === Role.ADMIN) {
            return this.bookingRepository.find();
        } else {
            return this.bookingRepository.find({
                where: {
                    user: {
                        id: request.user.id
                    }
                }
            });
        }

    } 
  @Get('filter-by-vestidos/:id')
findByBookId(@Param('id', ParseIntPipe) id: number){
    return this.bookingRepository.find({
        where: {
            vestidos: {
                id: id
            }
        }
    });
} 
@Get('filter-by-vestidosFiesta/:id')
findByBookingId(@Param('id', ParseIntPipe) id: number){
    return this.bookingRepository.find({
        where: {
            vestidoFiesta: {
                id: id
            }
        }
    });
} 
@Get('filter')
findWithFilter(@Query() filters: any) {
    console.log(filters);

    return this.bookingRepository.find({
        where: filters
    });
}
/* @Get('check-availability')
async checkAvailability(
  @Query('time') timeString: string
) {
  // Convertir la cadena de tiempo a un objeto Date con la fecha de referencia
  const time = new Date(`1970-01-01T${timeString}:00Z`); // 1970-01-01 es una fecha de referencia

  // Extraer solo la hora y minutos para la comparación
  const timeStringOnly = `${time.getUTCHours()}:${time.getUTCMinutes()}`;

  // Consulta para verificar la disponibilidad
  const existingBooking = await this.bookingRepository.findOne({
    where: {
      time: timeStringOnly
    }
  });

  if (existingBooking) {
    return { available: false };
  } else {
    return { available: true };
  }
} */

   
@Post()
@UseGuards(AuthGuard('jwt'))
create(@Body() booking: Booking, @Request() request) {
    
    booking.user = request.user;
    return this.bookingRepository.save(booking);
            
}




    @Delete(':id')
    async deleteById(
    @Param('id', ParseIntPipe) id: number
    ) {
    const exists = await this.bookingRepository.existsBy({ id: id });

    if (!exists) {
        throw new NotFoundException('Booking not found');
    }

    try {
        await this.bookingRepository.delete(id);
    } catch (error) {
        console.log("Error al borrar la reserva", error);
        throw new ConflictException('No se puede borrar.');
    }
}
}
