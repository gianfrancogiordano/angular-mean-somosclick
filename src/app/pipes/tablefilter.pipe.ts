import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablefilter'
})
export class TablefilterPipe implements PipeTransform {

  transform(data: any[], page: number = 0 ): any[] {
    return data.slice( page, page + 3 );
  }

}
