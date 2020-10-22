import { Client } from "./client";

export class Entreprise extends Client
{
    nom : string;
    phone : string;
    fax : string;

    constructor()
    {
        super();
        this.idClient = undefined;
        this.type = undefined;
        this.adresse = undefined;

        this.nom = undefined;
        this.phone = undefined;
        this.fax = undefined;
    }

}