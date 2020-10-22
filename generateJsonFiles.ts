import { Client } from "./client";
import { ProduitDroit } from "./produitDroit";

const fs = require('fs');
const NB_ITERATION = 5;

function generateCodeBarreJsonFiles()
{
    let arrayClient: Array<Client> = new Array();

    for (let index = 0; index < NB_ITERATION; index++) {

        if(index % 3 == 0)
        {
            //générer une entreprise
        }
        else if(index % 3 == 1)
        {
            //générer un individu
        }
        else {
            //générer un client
        }

        //remplir le Array de Client
    }
    return {"Clients": arrayClient};
}

function generateProduitDroitJsonFiles()
{
    let arrayProduitDroit: Array<ProduitDroit> = new Array()

    for (let index = 0; index < NB_ITERATION; index++) {
        //remplir le Array de ProduitDroit
    }

    return {"ProduitDroit": arrayProduitDroit};
}

fs.writeFileSync('dataClient.json', JSON.stringify(generateCodeBarreJsonFiles(), null, '\t'));
fs.writeFileSync('dataProduitDroit.json', JSON.stringify(generateProduitDroitJsonFiles(), null, '\t'));