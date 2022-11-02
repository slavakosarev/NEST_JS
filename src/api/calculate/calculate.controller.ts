import { Controller, Query, Patch } from '@nestjs/common';
import { CalculateService } from './calculate.service';

@Controller('calc')
export class CalculateController {
  constructor(private calculateService: CalculateService) {}

  @Patch('sum')
  sumParams(@Query() data: [number, number]): number {
    console.log(data);
    return this.calculateService.sumParams(data);
  }
}
