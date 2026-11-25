import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { JadwalService } from './jadwal.service';
import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';

@Controller('jadwal')
export class JadwalController {
  constructor(private readonly jadwalService: JadwalService) {}

  // GET /jadwal — ambil semua jadwal
  @Get()
  findAll() {
    return this.jadwalService.findAll();
  }

  // GET /jadwal/statistik — statistik count per status (endpoint opsional tugas no.8)
  @Get('statistik')
  getStatistik() {
    return this.jadwalService.getStatistik();
  }

  // GET /jadwal/:id — ambil 1 jadwal by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jadwalService.findOne(id);
  }

  // POST /jadwal — buat jadwal baru
  @Post()
  create(@Body() createJadwalDto: CreateJadwalDto) {
    return this.jadwalService.create(createJadwalDto);
  }

  // PUT /jadwal/:id — update jadwal (termasuk toggle status)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJadwalDto: UpdateJadwalDto,
  ) {
    return this.jadwalService.update(id, updateJadwalDto);
  }

  // DELETE /jadwal/:id — hapus jadwal
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jadwalService.remove(id);
  }
}

