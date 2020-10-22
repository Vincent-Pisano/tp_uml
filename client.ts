import { ClientType } from "./clientType"

export class Client
{
    idClient : number;
    type : ClientType;
    adresse : string;

    constructor() 
    {
        this.idClient = undefined;
        this.type = undefined;
        this.adresse = undefined;
    }
}