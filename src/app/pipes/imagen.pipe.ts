import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, ...args: any[]): string {

    if ( !img ) {
      return `${ base_url }/images/no-image`;
    }

    if ( img ) {
      return `${ base_url }/images/${ img }`;
    } else {
      return `${ base_url }/images/no-image`;
    }

  }

}
