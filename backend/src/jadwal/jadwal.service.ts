import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';

@Injectable()
export class JadwalService {
  constructor(private readonly prisma: PrismaService) {}

  // Ambil semua jadwal, urut terbaru dulu
  async findAll() {
    return this.prisma.jadwalMakan.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Ambil satu jadwal by id
  async findOne(id: number) {
    const jadwal = await this.prisma.jadwalMakan.findUnique({ where: { id } });
    if (!jadwal) throw new NotFoundException(`Jadwal id=${id} tidak ditemukan`);
    return jadwal;
  }

  // Buat jadwal baru
  async create(dto: CreateJadwalDto) {
    return this.prisma.jadwalMakan.create({ data: dto });
  }

  // Update jadwal (termasuk toggle status dari frontend)
  async update(id: number, dto: UpdateJadwalDto) {
    await this.findOne(id); // lempar 404 jika tidak ada
    return this.prisma.jadwalMakan.update({
      where: { id },
      data: dto,
    });
  }

  // Hapus jadwal
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.jadwalMakan.delete({ where: { id } });
  }

  // Statistik count per status (tugas opsional no.8)
  async getStatistik() {
    const total = await this.prisma.jadwalMakan.count();
    const sudah = await this.prisma.jadwalMakan.count({
      where: { status: 'Sudah Diberi Makan' },
    });
    const belum = await this.prisma.jadwalMakan.count({
      where: { status: 'Belum Diberi Makan' },
    });
    return { total, sudah, belum };
  }
}

