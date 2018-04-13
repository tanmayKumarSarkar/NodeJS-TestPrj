import {Pipe, PipeTransform} from '@angular/core';

@Pipe ({
  name : 'sort'
})

export class SortPipe implements PipeTransform{
  transform(value: any[], args: string): any {
    var tempAs = value;
    var tempDes = value;

    if(args === 'ascending'){
      tempAs = value;
      if(!tempAs.some(isNaN)){
        return tempAs.sort(function(a, b){return a - b});
      }else{
        return tempAs.sort();
      }
    }else if (args === 'descending') {
      tempDes = value;
      if(!tempDes.some(isNaN)){
        return tempDes.sort(function(a, b){return b - a});
      }else{
        return tempDes.sort().reverse();
      }
    }

  }
}
