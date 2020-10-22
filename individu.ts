import { Client } from "./client";

export class Individu extends Client
{
    prenom : string;
    nom : string;
    email : string; 

    constructor()
    {
        super();
        this.idClient = undefined;
        this.type = undefined;
        this.adresse = undefined;

        this.prenom = undefined;
        this.nom = undefined;
        this.email = undefined;
    }

}