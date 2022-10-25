import { Injectable } from '@nestjs/common';

export interface ICalc {
  f: number;
  s: number;
}

@Injectable()
export class CalculateService {
  private readonly calc: ICalc[] = [];

  sumParams(calc: [number, number]): number {
    const res = calc[0] + calc[1];
    console.log(calc);
    return res;
  }
}
