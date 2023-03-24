/*
  Il représente la classe base d'une instance de gestionnaire générique
*/ 
class GmBaseInstance {
  
  constructor(){
   
    this.spreadSheet = SpreadsheetApp.getActive();
    this.entityName = undefined;
    this.sheetName = undefined;
    this.gestionnaireSheetName = "Gestionnaire"
    this.sheet = undefined;
    this.tableName = "";
    this.Bl = undefined;
    this.titre = ""
    this.columnsNames = undefined;
    this.columnsTitles = undefined;
    this.entityForm = undefined;

    // Ranges
    this.entityNameRange = undefined;
    this.idNameColonneRange =  undefined;
    this.checkBoxIdsRange =undefined;
    this.titreGestionnaireRange = undefined;
    this.idEntityFilter1Range = undefined;

  }

  reload(){
      
      let titreRange =  this.titreGestionnaireRange;
      titreRange.setValue(this.titre);
      this.clearData();
      this.initColonnes();
      this.refreshData();
      this.showMenuSidebar();
  }

  /**
   * Intialisation de l'interface
   * - Création des colonnes
   * - Insertion des données
   * - Afficher le menu Sidebar
   * @return sheet instance
   */
  initSheet(){
    let isInit = false;
    this.sheet =  SpreadsheetApp.getActive().getSheetByName(this.sheetName);
    if(!this.sheet){
      isInit = true;
      this.sheet = this.createSheetIfNotExist();
    }

    // Init Range
    this.entityNameRange = this.sheet.getRange(1,2);
    this.idNameColonneRange =  this.sheet.getRange(6,2);
    this.checkBoxIdsRange = this.sheet.getRange("A:B")
    this.titreGestionnaireRange = this.sheet.getRange("C2");
    this.idEntityFilter1Range = this.sheet.getRange(2,2);

    if(isInit) this.reload();

    // edit EntityNameRange
    this.entityNameRange.setValue(this.entityName);

  }

  activate(){
    this.sheet.activate();
  }
  /**
   * Création de feuille de gestion s'il n'existe pas
   * @return the created sheet
   */
  createSheetIfNotExist(){


    let ss = SpreadsheetApp.getActive();


    // Create SheetManager Instance
    this.sheet =  ss.getSheetByName(this.sheetName);
    if (!this.sheet) {

      var gestionnaireSheet = ss.getSheetByName(this.gestionnaireSheetName);
      gestionnaireSheet.copyTo(ss).setName(this.sheetName);
      this.sheet = ss.getSheetByName(this.sheetName);

      // entityNameRange
    }
    this.sheet.activate();


    return this.sheet;

  }

  clearData(){
    let idrow = this.idNameColonneRange.getRow();
    let idcolumns = this.idNameColonneRange.getColumn();
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
    let idNameColonneRange =  this.sheet.getRange(6,2);
    let columnsNamesRange = this.sheet.getRange(idNameColonneRange.getRow(),idNameColonneRange.getColumn(),1,columnsNumber);
    
    if(this.columnsTitles) columnsNamesRange.setValues([this.columnsTitles]);
    else columnsNamesRange.setValues([this.columnsNames]);
  }


  refreshData(){
    let data = this.Bl.findAll();
    this.showData(data);
  }



/**
 * Afficher un tableau des valeurs dans l'interface
 * @param values un tableau des valeurs à afficher.
 */
  showData(data){

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



    let numRow = values.length;
    let numColumns = this.columnsNames.length;
    let idrow = this.idNameColonneRange.getRow();
    let idcolumns = this.idNameColonneRange.getColumn();
    let rangeData = this.sheet.getRange(idrow+1,idcolumns,numRow,numColumns );
    rangeData.setValues(values)
  }
 

  
  showMenuSidebar(){
        var html = HtmlService.createHtmlOutputFromFile('5.Views/menuGestionVilles.html')
      .setTitle('Gestion des villes');
      SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
  }


  /**
   * Trouver les Ids des lignes selectionnées 
   * @return {selectedIds} un tableau des ligne selectionnée
   */
  getSelectedIds(){
    // find selected Id 
    let selectedIds = this.sheet.getRange("A:B")
                          .getValues()
                          .filter(v=> (v[0] == true))
                          .map(v=>v[1]);
    return selectedIds;

  }

  clearSelectedIds(){
    let checkBoxRange = this.sheet.getRange(this.checkBoxIdsRange.getRow(),this.checkBoxIdsRange.getColumn(),this.checkBoxIdsRange.getNumRows());
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
