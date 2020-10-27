"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client");
var droit_1 = require("./droit");
var droitType_1 = require("./droitType");
var individu_1 = require("./individu");
var entreprise_1 = require("./entreprise");
var option_1 = require("./option");
var produit_1 = require("./produit");
var produitDroit_1 = require("./produitDroit");
var contact_1 = require("./contact");
var details_1 = require("./details");
var clientType_1 = require("./clientType");
var faker = require('faker');
var fs = require('fs');
var NB_ITERATION = 5;
var compteurIdDroit = 0;
var arrayProduit = generateProduit();
var arrayDroit = generateDroit(NB_ITERATION);
function generateDroit(nbrIteration) {
    var arrayDroit = new Array();
    var droit;
    for (var i = 0; i < nbrIteration; i++) {
        droit = new droit_1.Droit();
        droit.idDroit = compteurIdDroit.toString();
        compteurIdDroit++;
        droit.type = droitType_1.DroitType[Math.floor(Math.random() * 3)];
        droit.dateDebut = faker.date.past();
        droit.dateFin = faker.date.future();
        arrayDroit.push(droit);
    }
    return arrayDroit;
}
function generateProduit() {
    var arrayProduit = new Array();
    var produit;
    for (var index = 0; index < NB_ITERATION; index++) {
        produit = new produit_1.Produit();
        produit.id = index;
        produit.nom = faker.commerce.productName();
        produit.description = faker.commerce.productDescription();
        if (index % 2 == 0) {
            produit.option = generateOption(index);
        }
        arrayProduit.push(produit);
    }
    return arrayProduit;
}
function generateOption(index) {
    var option;
    option = new option_1.Option();
    option.id = index;
    option.nom = faker.random.words();
    option.description = faker.lorem.sentence();
    return option;
}
function generateContact(index) {
    var contact;
    contact = new contact_1.Contact();
    contact.idContact = index;
    contact.nom = faker.name.lastName();
    contact.prenom = faker.name.firstName();
    contact.email = faker.internet.email();
    return contact;
}
function generateDetails(index) {
    var details;
    details = new details_1.Details();
    details.idDetails = index;
    details.rue = faker.address.streetName();
    details.ville = faker.address.city();
    details.province = faker.address.county();
    return details;
}
function generateClient(index) {
    var client;
    client = new client_1.Client();
    client.idClient = index;
    client.type = clientType_1.ClientType.non_defini;
    client.adresse = faker.address.streetAddress();
    return client;
}
function generateIndividu(index) {
    var individu;
    individu = new individu_1.Individu();
    individu.idClient = index;
    individu.adresse = faker.address.streetAddress();
    individu.type = clientType_1.ClientType.individu;
    var newContact = generateContact(index);
    var newdetails = generateDetails(index);
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
function generateEntreprise(index) {
    var entreprise;
    entreprise = new entreprise_1.Entreprise();
    entreprise.idClient = index;
    entreprise.adresse = faker.address.streetAddress();
    entreprise.type = clientType_1.ClientType.entreprise;
    entreprise.nom = faker.company.companyName();
    entreprise.phone = faker.phone.phoneNumber();
    entreprise.fax = faker.internet.email();
    var newContact = generateContact(index);
    var newdetails = generateDetails(index);
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
function generateDroitClients() {
    var nbrIteration = Math.floor(Math.random() * (NB_ITERATION - 1)) + 1;
    var droits = generateDroit(nbrIteration);
    return droits;
}
function generateClientJsonFiles() {
    var arrayClient = new Array();
    var client = new client_1.Client();
    for (var index = 0; index < NB_ITERATION; index++) {
        if (index % 3 == 0) {
            client = generateEntreprise(index);
        }
        else if (index % 3 == 1) {
            client = generateIndividu(index);
        }
        else {
            client = generateClient(index);
        }
        client.droits = generateDroitClients();
        arrayClient.push(client);
    }
    return { "Clients": arrayClient };
}
function generateProduitDroitJsonFiles() {
    var arrayProduitDroit = new Array();
    var produitDroit;
    for (var index = 0; index < NB_ITERATION; index++) {
        produitDroit = new produitDroit_1.ProduitDroit();
        produitDroit.produit = arrayProduit[Math.floor(Math.random() * NB_ITERATION)];
        produitDroit.droit = arrayDroit[Math.floor(Math.random() * NB_ITERATION)];
        arrayProduitDroit.push(produitDroit);
    }
    return { "ProduitDroit": arrayProduitDroit };
}
fs.writeFileSync('../database/dataClient.json', JSON.stringify(generateClientJsonFiles(), null, '\t'));
fs.writeFileSync('../database/dataProduitDroit.json', JSON.stringify(generateProduitDroitJsonFiles(), null, '\t'));
