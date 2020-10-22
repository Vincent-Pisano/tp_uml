import { Client } from "./client";
import { Option } from "./option";
import { Produit } from "./produit";

export class CodeBarre
{
    id: number;
    code: String;
    client : Client;
    options : Array<Option>;
    produits : Array<Produit>;

    constructor()
    {
        this.id = undefined;
        this.code = undefined;
        this.client = undefined;
        this.options = undefined;
        this.produits = undefined;
    }
}