import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  async actualizarFoto(tipo: 'avatars' | 'login' | 'soportes', id: string, archivo: File) {

    try {

      const url = `${base_url}/images/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData

      });

      const data = await resp.json();

      if (data.ok) {
        return data.nombreArchivo;
      } else {
        console.log(data);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
    
  }

}
