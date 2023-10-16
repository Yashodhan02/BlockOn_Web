// numberToWords.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

    transform(value: number): string {
    const singleDigits = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (value === 0) {
      return 'zero';
    } else if (value < 0) {
      return 'minus ' + this.transform(Math.abs(value));
    }

    let words = '';

    if (Math.floor(value / 1000000) > 0) {
      words += this.transform(Math.floor(value / 1000000)) + ' million ';
      value %= 1000000;
    }

    if (Math.floor(value / 1000) > 0) {
      words += this.transform(Math.floor(value / 1000)) + ' thousand ';
      value %= 1000;
    }

    if (Math.floor(value / 100) > 0) {
      words += this.transform(Math.floor(value / 100)) + ' hundred ';
      value %= 100;
    }

    if (value > 0) {
      if (words !== '') {
        words += 'and ';
      }

      if (value < 10) {
        words += singleDigits[value];
      } else if (value < 20) {
        words += teens[value % 10];
      } else {
        words += tens[Math.floor(value / 10)];
        if (value % 10 > 0) {
          words += '-' + singleDigits[value % 10];
        }
      }
    }

    return words.trim();
  }
}