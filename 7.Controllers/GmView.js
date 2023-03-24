/*
  Gm : Généric Manager
  - Le viewManager généric manager n'est pas une classe parce que 
      - [à vérifier] l'interface google sheet ne peut pas communiquer avec une classe, mais seulement avec les fonctions
*/


function testGmView(){

  SaveEntityRowGmView({Id:8,Nom:"madani8"})
  // editGmView()
  // let data  = getCreateOrEditEntityGmView()
  // // InitViewManager("Membre")
  // // InitViewManager("Ville")
  // console.log(data);
}



// Méthodes

function setCurrentManager(value){
      SpreadsheetApp.getActive().getRangeByName("currentManagerReference").setValue(value);
}

function getCurrentManager(){
    return SpreadsheetApp.getActive().getRangeByName("currentManagerReference").getValue();
}

function GetGmInstance(){
    let gmInstance = undefined;
    let referenceManager = getCurrentManager();
    switch(referenceManager){
      case "MembreTache" : gmInstance = new GmMembresTachesInstance(); break;
      case "Membre" : gmInstance = new GmMembresInstance(); break;
    }
    return gmInstance;
}

// Actions 


function InitViewManager(managerReference){
  setCurrentManager(managerReference);
  GetGmInstance().initManager();
  SpreadsheetApp.getActive().getSheetByName("Gestionnaire").activate();

}

function RefreshDataGmView(){
  GetGmInstance().refreshData();
}

function GmManagerDelete(){
  GetGmInstance().deleteRow();
}

// [question : est ce que une fonction dans google app ascript doit commencer par une lettre maguscule ou miniscule]
function editGmView(){
  GetGmInstance().editRow();
}

function AddGmView(){
  GetGmInstance().addRow();
}

/**
 * Trouver l'entity à créer ou à modifier
 */
function getCreateOrEditEntityGmView(){
  let entityData = GetGmInstance().getCreateOrEditEntityGmView();

  // Vous ne pouvez pas transmettre les valeurs Date au Service HTML
  // voir la documentation : https://developers.google.com/apps-script/guides/html/communication?hl=fr#parameters_and_return_values
  // stackoverflow : https://stackoverflow.com/questions/67133962/datetime-seems-to-break-google-apps-script-client-side-deserialization
  // nous allons essayer de serialiser les valeurs date en datetime
  if( entityData.DateCreation)   entityData.DateCreation =   entityData.DateCreation.getTime();
  if( entityData.DateModification)  entityData.DateModification = entityData.DateModification.getTime();

  return entityData
}

/**
 * Enregistrer le formulaire 
 */
function SaveEntityRowGmView(entityRow){
  // try{
    AfficherToast("Enregsitrement de l'entity : " + Object.values(entityRow));
    console.log(entityRow);
    GetGmInstance().saveEntityRow(entityRow);
    RefreshDataGmView()
  // }catch(error){
  //   AfficherToast(error);
  //   throw error
  // }

}




