import { Module } from '@nestjs/common';
import { CalcController } from './calculate.controller';
import { CalcService } from './calculate.service';

@Module({
  controllers: [CalcController],
  providers: [CalcService],
})
export class CalcModule {}
