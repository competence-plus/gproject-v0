/*
  Il représente la classe base d'une instance de gestionnaire générique
*/ 
class GmBaseInstance {
  
  constructor(){
   
    this.spreadSheet = SpreadsheetApp.getActive();
    this.entityName = undefined;
    this.sheetName = "Gestionnaire";
    this.sheet = this.spreadSheet.getSheetByName("Gestionnaire");
    this.tableName = "";
    this.Bl = undefined;
    this.titre = ""
    this.columnsNames = undefined;
    this.columnsTitles = undefined;
    this.entityForm = undefined;
    
  }

  /*
    Intialisation de l'interface
  */
  initManager(){

    // Titre
    let titreRange =  this.spreadSheet.getRangeByName("TitreGestionnaire");
    titreRange.setValue(this.titre);

    // Clear Data
    this.clearData();

    // Coloones
    this.initColonnes();

    // afficher les données
    this.refreshData();

   
    this.showMenuSidebar();
  }

  showMenuSidebar(){
        var html = HtmlService.createHtmlOutputFromFile('menuGestionVilles.html')
      .setTitle('Gestion des villes');
      SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
  }

  clearData(){
    let idNameColonneRange =  this.spreadSheet.getRangeByName("IdNameColonnGestionnaire");
    let idrow = idNameColonneRange.getRow();
    let idcolumns = idNameColonneRange.getColumn();
    let numRow = this.sheet.getLastRow() -idrow;
    let numColumn = 20;
    let rangeDataWithColumns = this.sheet.getRange(idrow,idcolumns,numRow,numColumn );
    rangeDataWithColumns.clearContent();
  }

  /*
    Initialisation des clonnes
  */ 
  initColonnes(){
    let columnsNumber = this.columnsNames.length;
    let idNameColonneRange =  this.spreadSheet.getRangeByName("IdNameColonnGestionnaire");
    let columnsNamesRange = this.sheet.getRange(idNameColonneRange.getRow(),idNameColonneRange.getColumn(),1,columnsNumber);
    
    if(this.columnsTitles) columnsNamesRange.setValues([this.columnsTitles]);
    else columnsNamesRange.setValues([this.columnsNames]);
  }

/**
 * Afficher un tableau des valeurs dans l'interface
 * @param values un tableau des valeurs à afficher.
 */
  afficherValues(values){
    let idNameColonneRange =  this.spreadSheet.getRangeByName("IdNameColonnGestionnaire");
    let numRow = values.length;
    let numColumns = this.columnsNames.length;
    let idrow = idNameColonneRange.getRow();
    let idcolumns = idNameColonneRange.getColumn();
    let rangeData = this.sheet.getRange(idrow+1,idcolumns,numRow,numColumns );
    rangeData.setValues(values)
  }
 
  refreshData(){
    let data = this.Bl.findAll(this.columnsNames);

    // Convert an Array of Objects to an Array of Values with columnsNames order
    const values = data.map(object => {
        let arrayKeyValue = Object.entries(object);
        let lineValue = [];

        arrayKeyValue.forEach( keyValue => {
          if(this.columnsNames.includes(keyValue[0] )){
              // insert in lineVallue with the same columns index 
              let columnsIndex = this.columnsNames.indexOf(keyValue[0]);
              lineValue[columnsIndex] = keyValue[1];
          }
        })

        // arrayKeyValue = arrayKeyValue.filter(keyValue => this.columnsNames.includes(keyValue[0] ));


        // arrayKeyValue.forEach(keyValue =>  lineValue.push(keyValue[1])) ;
        return lineValue;
    });
    // console.log(values);
    this.afficherValues(values);

  }

  
  /**
   * Trouver les Ids des lignes selectionnées 
   * @return {selectedIds} un tableau des ligne selectionnée
   */
  getSelectedIds(){
    // find selected Id 
    let selectedIds = this.spreadSheet
                          .getRangeByName("CheckBoxIdsColonnesGestionnaire")
                          .getValues()
                          .filter(v=> (v[0] == true))
                          .map(v=>v[1]);
    return selectedIds;

  }
  clearSelectedIds(){
    let checkBoxIdsRange = this.spreadSheet.getRangeByName("CheckBoxIdsColonnesGestionnaire");

    let checkBoxRange = this.sheet.getRange(checkBoxIdsRange.getRow(),checkBoxIdsRange.getColumn(),checkBoxIdsRange.getNumRows());
    checkBoxRange.clearContent();
  }

    // Supprimer une ligne 
  deleteRow(){
    let ids = this.getSelectedIds();
    if(ids.length > 1) throw("Vous devez supprimer ligne par ligne");
    this.Bl.deleteEntity(ids[0]);
    this.clearData();
    this.refreshData();
    this.clearSelectedIds();
  }


  //

/**
 * Editer la première ligne selectionnée
 */
  editRow(){

    let ids = this.getSelectedIds()
    if(ids.length == 0 ) throw("Vous devez selectionner une ligne pour le mettre à jour");
    let id = ids[0];
    let entityData = this.Bl.findById(id);
    this.showEditForm(entityData);
  }


  addRow(){
    let entityData = this.Bl.newEntity();
    this.showEditForm(entityData);
  }
  /**
   * Afficher la page de modofication dans ShowDialog
   */
  showEditForm(entity){

    if(!this.entityForm) throw( new Error("Le formulaire de l'entité " + this.entityName + " n'est pas définie"))
    var template = HtmlService.createTemplateFromFile(this.entityForm);
    template.title = "Modification de la ville : " + entity;
    template.jsonEntity = JSON.stringify(entity);
    var form = HtmlService.createHtmlOutput(template.evaluate());
    form.setWidth(900);
    form.setHeight(500);

    SpreadsheetApp.getUi().showModalDialog(form,"Modifier la vile : " + entity);
  }


  getCreateOrEditEntityGmView(){
    let ids = this.getSelectedIds()
    if(ids.length == 0 ) throw("Vous devez selectionner une ligne pour le mettre à jour");
    let id = ids[0];
    let entityData = this.Bl.findById(id);
    return entityData;
  }

  saveEntityRow(entityRow){

      this.Bl.saveEntityRow(entityRow);

      
  }














}
