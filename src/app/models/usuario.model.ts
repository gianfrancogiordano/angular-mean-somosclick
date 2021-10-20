
export class Usuario {

    constructor(

        public nombre: string,
        public usuario: string,
        public email?: string,
        public password?: string,
        public img?: string,
        public role?: any,
        public clinica?: string,
        public uid?: string,

    ) { }

};