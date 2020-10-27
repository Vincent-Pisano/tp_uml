import { Option } from "./option";

export class Produit
{
    id : number;
    nom : String;
    description : String;
    option : Option;
    produit : Produit;

    constructor()
    {
        this.id = undefined;
        this.nom = undefined;
        this.description = undefined;
        this.produit = undefined; 
        this.option = undefined;
    }
}