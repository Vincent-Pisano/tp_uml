import { Client } from "./client";
import { Contact } from "./contact";
import { Details } from "./details";

export class Individu extends Client
{
    contact: Contact;
    details : Details
    
    constructor()
    {
        super(); 
        this.idClient = undefined;
        this.type = undefined;
        this.adresse = undefined;

        this.contact = new Contact();
        this.details = new Details();
    }

}