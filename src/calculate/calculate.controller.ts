import { Controller, Query, Patch } from '@nestjs/common';
import { Calc } from './calculate.interface';
import { CalcService } from './calculate.service';

@Controller('calc')
export class CalcController {
  constructor(private calcService: CalcService) {}

  @Patch('/')
  sumParams(@Query() data: Calc): number {
    console.log(data);
    return this.calcService.useParams(data);
  }
}
