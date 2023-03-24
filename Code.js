 function debug(){
  //  CreateGmInstance("Membre",undefined)
   RefreshDataGmView();
  //  CreateGmInstance("MembreTache",2)
  //  SaveEntityRowGmView({Id:57,Etat:"En validation2"})
 }
// function test(){

// //    Tamotsu.initialize();
// //    let table = Tamotsu.Table.define({ 
// //       sheetName: "VillesTable",
// //       idColumn: 'Id'
// //       });
  
// //  let  data = table.find(8);


//  SaveEntityRowGmView({Id:8,Nom:"Ville3 Tanger"})
//   // getCreateOrEditEntityGmView();
//   //  InitViewManager("Ville")
//   // GmManagerDelete();

//   // Test généric coide 
//   // let VilleCasse = Ville;
//   // let v = new VilleCasse();
//   // console.log(v);
// }

// /*
//   todo : 
//   - Ajouter les commentaires de documentation pour tous les functions
//   - Installer un environnement de développement avec VS Code
//   - Sauvegarde du code dans Github
//   - Gestion de sécurité
//   - Localisation des message
//   - Gestion des exceptions : Affichage d'une message en cas d'exception
// */


// function testAll(){
//    console.log("Test de l'interface Gestion des membres");
//    InitViewManager("Membre");
//    GmManagerRefreshData();
//    console.log("Test de l'interface Gestion des ville");
//    InitViewManager("Ville")
//    GmManagerRefreshData()
// }

function InitApp(){

  AfficherToast("showSidebar");
  showSidebar();
}



function onOpen(){
  AfficherToast("Creation de menu");
  createMenu();
}

/**
 * Création de menu de l'application
 */

// Création des function dynamique pour la création de menu
for (var projet of new ProjetsBL().findAll() ) {
  let idProjet = projet.Id ;

  // Add dynamic function for : Gestion des tâches
  this["afficheGestionTacheDeProjet" + idProjet] = function() {   afficheGestionTaches(idProjet); };
  this["afficheGestionQuestionDeProjet" + idProjet] = function() {   afficheGestionQuestions(idProjet); };

}

function afficheGestionTaches(idProjet) {
  CreateGmInstance("MembreTache",idProjet)
}
function afficheGestionQuestions(idProjet) {
  CreateGmInstance("Question",idProjet)
}
function afficheGestionQuestions(idProjet) {
  CreateGmInstance("Membre",undefined)
}
function afficheGestionMembres() {
  CreateGmInstance("Membre",undefined)
}

function createMenu(){
  let ui = SpreadsheetApp.getUi();
  let menu = ui.createMenu('Gestion de projet');


  menu.addItem('Gestion des membres', 'afficheGestionMembres');
  menu.addItem('Gestion des projets', 'gestionMembresMenuItem');
  menu.addSeparator();

  // Afficher les sous menu pour chaque projet
  let projets = new ProjetsBL().findAll();
  projets.forEach( projet => {

    // Sous menu du projet 
    let subMenu = ui.createMenu(projet.Nom);
    subMenu.addItem('Gestion des Tâches', 'afficheGestionTacheDeProjet' + projet.Id)
    subMenu.addItem('Gestion des Questions', 'afficheGestionQuestionDeProjet' + projet.Id)
    menu.addSubMenu(subMenu);
        
   

  } );


  menu.addSeparator();
  menu.addItem('Admin', 'showSidebar');
  menu.addToUi();

}







function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('menuPrincipale')
      .setTitle('Admin');
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}
function gestionMembresMenuItem(){
  InitViewManager("Membre")
}


 

// function drawinLab(){
//   var drawings = SpreadsheetApp.getActiveSheet().getDrawings();
// // for (var i = 0; i < drawings.length; i++) {
// //   Logger.log(drawings[i].getOnAction());
// // }

  
//     for (var i = 0; i < drawings.length; i++) {
//         const drawing = drawings[i];
//         if (drawing.getOnAction() === "GenericManagerAfficherData") {
//             drawing.setWidth(40);
//             drawing.setHeight(40);
//             break;
//         }
//     }



// }


