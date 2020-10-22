import { Client } from "./client";
import { Droit } from "./droit";
import { DroitType } from "./droitType";
import { Individu } from "./individu";
import { Entreprise } from "./entreprise";
import { Option } from "./option";
import { Produit } from "./produit";
import { ProduitDroit} from "./produitDroit";
import { Contact } from "./contact";
import { Details } from "./details";
import { ClientType } from "./clientType";

const faker = require('faker');
const fs = require('fs');
const NB_ITERATION = 5;

let compteurIdDroit: number = 0;

let arrayProduit: Array<Produit> = generateProduit();
let arrayDroit: Array<Droit> = generateDroit(NB_ITERATION);



function generateDroit(nbrIteration: number)
{
    let arrayDroit: Array<Droit> = new Array();
    let droit: Droit;

    for (let i = 0; i < nbrIteration; i++) {
        droit = new Droit();
        droit.idDroit = compteurIdDroit.toString();
        compteurIdDroit++;
        droit.type = DroitType[Math.floor(Math.random() * 3)] as unknown as DroitType;
        droit.dateDebut = faker.date.past();
        droit.dateFin = faker.date.future();

        arrayDroit.push(droit);
    }

    return arrayDroit;
}

function generateProduit()
{
    let arrayProduit: Array<Produit> = new Array();
    let produit: Produit;

    for (let index = 0; index < NB_ITERATION; index++) {
        produit = new Produit();
        produit.id = index;
        produit.nom = faker.commerce.productName();
        produit.description = faker.commerce.productDescription();
        if (index % 2 == 0)
        {
            produit.option = generateOption(index);
        }
        arrayProduit.push(produit);
    }

    return arrayProduit;
}

function generateOption(index: number)
{
    let option: Option;

    option = new Option();
            option.id = index;
            option.nom = faker.random.words();
            option.description = faker.lorem.sentence();

    return option;
}

function generateContact(index: number)
{
    let contact: Contact
    contact = new Contact();

    contact.idContact = index;
    contact.nom = faker.name.lastName();
    contact.prenom = faker.name.firstName();
    contact.email = faker.internet.email();

    return contact;
}

function generateDetails(index: number)
{
    let details: Details;
    details = new Details();

    details.idDetails = index;
    details.rue = faker.address.streetName();
    details.ville = faker.address.city();
    details.province = faker.address.county();

    return details;
}

function generateClient(index: number)
{
    let client: Client;
    client = new Client();
    client.idClient = index;
    client.type = ClientType.non_defini;
    client.adresse = faker.address.streetAddress();

    return client;
}

function generateIndividu(index: number)
{
    let individu: Individu;
    individu = new Individu();
    individu.idClient = index;
    individu.adresse = faker.address.streetAddress();
    individu.type = ClientType.individu;

    let newContact: Contact = generateContact(index)
    let newdetails: Details = generateDetails(index)

    individu.contact.idContact = newContact.idContact;
    individu.contact.prenom = newContact.prenom;
    individu.contact.nom = newContact.nom;
    individu.contact.email = newContact.email;

    individu.details.idDetails = newdetails.idDetails;
    individu.details.rue = newdetails.rue;
    individu.details.ville = newdetails.ville;
    individu.details.province = newdetails.province;

    return individu;
}

function generateEntreprise(index: number)
{
    let entreprise: Entreprise;
    entreprise = new Entreprise();
    entreprise.idClient = index;
    entreprise.adresse = faker.address.streetAddress();
    entreprise.type = ClientType.entreprise;
    entreprise.nom = faker.company.companyName();
    entreprise.phone = faker.phone.phoneNumber();
    entreprise.fax = faker.internet.email();

    let newContact: Contact = generateContact(index)
    let newdetails: Details = generateDetails(index)

    entreprise.contact.idContact = newContact.idContact;
    entreprise.contact.prenom = newContact.prenom;
    entreprise.contact.nom = newContact.nom;
    entreprise.contact.email = newContact.email;

    entreprise.details.idDetails = newdetails.idDetails;
    entreprise.details.rue = newdetails.rue;
    entreprise.details.ville = newdetails.ville;
    entreprise.details.province = newdetails.province;

    return entreprise;
}

function generateDroitClients()
{
    let nbrIteration: number = Math.floor(Math.random() * (NB_ITERATION - 1)) + 1;
    let droits: Array<Droit> = generateDroit(nbrIteration);

    return droits;
}

function generateClientJsonFiles()
{
    let arrayClient: Array<Client> = new Array();
    let client: Client = new Client();

    for (let index = 0; index < NB_ITERATION; index++) {

        client.droits = generateDroitClients();
        if(index % 3 == 0)
        {
            client = generateEntreprise(index);
        }
        else if(index % 3 == 1)
        {
            client = generateIndividu(index);
        }
        else {
            client = generateClient(index);
        }

        arrayClient.push(client);
    }
    return {"Clients": arrayClient};
}

function generateProduitDroitJsonFiles()
{
    let arrayProduitDroit: Array<ProduitDroit> = new Array()
    let produitDroit: ProduitDroit;

    for (let index = 0; index < NB_ITERATION; index++) {
        produitDroit = new ProduitDroit();
        produitDroit.produit = arrayProduit[Math.floor(Math.random() * NB_ITERATION)];
        produitDroit.droit = arrayDroit[Math.floor(Math.random() * NB_ITERATION)]

        arrayProduitDroit.push(produitDroit);
    }

    return {"ProduitDroit": arrayProduitDroit};
}

fs.writeFileSync('dataClient.json', JSON.stringify(generateClientJsonFiles(), null, '\t'));
fs.writeFileSync('dataProduitDroit.json', JSON.stringify(generateProduitDroitJsonFiles(), null, '\t'));