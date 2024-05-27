import { Body, Controller, Get, Injectable, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
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

    @Get('filter-by-id/:id')
    findById(@Param('id', ParseIntPipe) id: number){
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
    
    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() booking: Booking, @Request() request) {
        
        booking.user = request.user;
        return this.bookingRepository.save(booking);
                
    }
}
