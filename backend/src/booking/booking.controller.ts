import { Controller, Get, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.model';
import { Repository } from 'typeorm';

@Controller('booking')
export class BookingController {
    constructor(@InjectRepository(Booking)
    private bookingRepository: Repository<Booking>){}

    @Get()
    findAll(){
        return this.bookingRepository.find()
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number){
        return this.bookingRepository.findOne({
            where: {
                id: id
            }
        });
    }
}
