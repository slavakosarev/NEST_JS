import { Injectable } from '@nestjs/common';
import { Calc } from './calculate.interface';

@Injectable()
export class CalcService {
  useParams(calc: Calc): number {
    console.log(calc);
    let res = 0;
    if (calc.oper === 'plus') {
      res = +calc.f + +calc.s;
    }
    if (calc.oper === 'minus') {
      res = calc.f - calc.s;
    }
    if (calc.oper === 'multi') {
      res = calc.f * calc.s;
    }
    if (calc.oper === 'divide') {
      res = calc.f / calc.s;
    }

    return res;
  }
}
