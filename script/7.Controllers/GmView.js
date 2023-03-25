/*
  Gm : Généric Manager
  - Le viewManager généric manager n'est pas une classe parce que 
      - [à vérifier] l'interface google sheet ne peut pas communiquer avec une classe, mais seulement avec les fonctions
*/


function testGmView(){
  editGmView()
  // RefreshDataGmView();
  // AddGmView()
  // GetActiveGmInstance();
  // InitViewManager("MembreTache", 1)


  // SaveEntityRowGmView({Id:8,Nom:"madani8"})
  // editGmView()
  // let data  = getCreateOrEditEntityGmView()
  // // InitViewManager("Membre")
  // // InitViewManager("Ville")
  // console.log(data);
}


/**
 * Création de gestionnaire : duplication de gestionnaire généric
 * @param entityName Le nom de l'entité à génrer
 * @param idProjet Id du projet à génrer
 */
function CreateGmInstance(entityName, filterId1){

  if (!entityName) throw new Error("Vous ne pouvez pas créer un gestionnaire dans déterminer le nom de l'entité");
  

  let gmInstance = undefined;

  switch(entityName){
    case "MembreTache" : gmInstance = new GmMembresTachesInstance(filterId1); break;
    case "Membre" : gmInstance = new GmMembresInstance(); break;
  }
  gmInstance.activate();
  return gmInstance;

}


/**
 * Get current GmInstance
 */
function GetActiveGmInstance(){
    let entityNameRange = SpreadsheetApp.getActiveSheet().getRange(1,2);
    let entityName = entityNameRange.getValue();
    let filterId1 = SpreadsheetApp.getActiveSheet().getRange(2,2).getValue();
    return CreateGmInstance(entityName,filterId1)
}

// Actions 

function RefreshDataGmView(){
  GetActiveGmInstance().reload();


}

function GmManagerDelete(){
  GetActiveGmInstance().deleteRow();
}

// [question : est ce que une fonction dans google app ascript doit commencer par une lettre maguscule ou miniscule]
function editGmView(){
  GetActiveGmInstance().editRow();
}

function AddGmView(){
  GetActiveGmInstance().addRow();
}

/**
 * Trouver l'entity à créer ou à modifier
 */
function getCreateOrEditEntityGmView(){
  let entityData = GetActiveGmInstance().getCreateOrEditEntityGmView();

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
    GetActiveGmInstance().saveEntityRow(entityRow);
    RefreshDataGmView()
  // }catch(error){
  //   AfficherToast(error);
  //   throw error
  // }

}




