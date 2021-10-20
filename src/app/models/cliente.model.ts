
export class Cliente {

  constructor(

    public razon_social: string,
    public nombre_comercial: string,
    public avatar: string,
    public activo: string,
    public documento: string,
    public email: string,
    public telefono: string,
    public direccion: string,
    public barrio: string,
    public idmunicipios: number,
    public idtipo_cliente: number,
    public idfabrica: number,
    public latitud?: number,
    public longitud?: number,
    public idclientes?: string

  ) { }

};