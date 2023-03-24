
 function debug(){
  //  InitViewManager("MembreTache")
   SaveEntityRowGmView({Id:57,Etat:"En validation2"})
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

function createMenu(){
 SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Gestion de projet')
      .addItem('Gestion des membres', 'gestionMembresMenuItem')
      .addItem('Réalisation des tâches', 'realisationTacheMenuItem')
      // .addItem('Gestion des villes', 'gestionVillesMenuItem')
      .addItem('Admin', 'showSidebar')
      .addToUi();

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
function realisationTacheMenuItem(){
  InitViewManager("MembreTache")
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


