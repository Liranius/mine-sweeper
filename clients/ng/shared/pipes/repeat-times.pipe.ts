import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeatTimes'
})
export class RepeatTimesPipe implements PipeTransform {
  transform(value: number): Iterable<number> {
    return {
      *[Symbol.iterator](): IterableIterator<number> {
        for (let i = 0; i < value; i++) {
          yield i;
        }
      }
    };
  }
}
