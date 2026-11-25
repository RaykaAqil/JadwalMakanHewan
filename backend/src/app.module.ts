import { Module } from '@nestjs/common';
import { JadwalModule } from './jadwal/jadwal.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, JadwalModule],
})
export class AppModule {}

