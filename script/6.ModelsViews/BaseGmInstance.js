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

    // Modal 
    this.formWidth =  950;
    this.formHeight = 600;

  }

  // Initialisation de l'interface 


  /**
   * Init colonnes et données
   */
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

  /**
   * Activation de l'interface 
   */
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


  /**
   * Clear Data
   */
  clearData(){
    let idrow = this.idNameColonneRange.getRow();
    let idcolumns = this.idNameColonneRange.getColumn();
    let numRow = this.sheet.getLastRow() -idrow;
    let numColumn = 20;
    let rangeDataWithColumns = this.sheet.getRange(idrow,idcolumns,numRow,numColumn );
    rangeDataWithColumns.clearContent();
  }

  /**
   * Init Colonnes
   */
  initColonnes(){
    let columnsNumber = this.columnsNames.length;
    let idNameColonneRange =  this.sheet.getRange(6,2);
    let columnsNamesRange = this.sheet.getRange(idNameColonneRange.getRow(),idNameColonneRange.getColumn(),1,columnsNumber);
    
    if(this.columnsTitles) columnsNamesRange.setValues([this.columnsTitles]);
    else columnsNamesRange.setValues([this.columnsNames]);
  }

 
// Private actions

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



  /**
   * Afficher le menu latéral
   */
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

  /**
   * clearSelectedIds
   */
  clearSelectedIds(){
    let checkBoxRange = this.sheet.getRange(this.checkBoxIdsRange.getRow(),this.checkBoxIdsRange.getColumn(),this.checkBoxIdsRange.getNumRows());
    checkBoxRange.clearContent();
  }

  /**
   * Create Template for Form to be evaluated
   * @param entity The value of Entity to be updated or added
   */
  getEntityFormTemplate(entity){
    let template = HtmlService.createTemplateFromFile(this.entityForm);
    template.jsonEntity = JSON.stringify(entity);
    return template;
  }

  /**
   * Afficher la page de modofication dans ShowDialog
   * @param title le tittre de fenêtre modal
   */
  showEntityForm(entity,title){

    if(!this.entityForm) throw( new Error("Le formulaire de l'entité " + this.entityName + " n'est pas définie"))
    let template = this.getEntityFormTemplate(entity);
    var form = HtmlService.createHtmlOutput(template.evaluate());
    form.setWidth(this.formWidth);
    form.setHeight(this.formHeight);

    SpreadsheetApp.getUi().showModalDialog(form,title);
  }



// Public actions : CRUD

  /**
   * refreshData
   */
  refreshData(){
    let data = this.Bl.findAll();
    this.showData(data);
  }


  /**
   * Ajouter une nouvelle ligne
   */
  addRow(){
    let entityData = this.Bl.newEntity();
    let modalTitle = "Modification : " + entityData;
    this.showEntityForm(entityData,modalTitle);
  }

  /**
   * Editer la première ligne selectionnée
   */
  editRow(){

    let ids = this.getSelectedIds()
    if(ids.length == 0 ) throw("Vous devez selectionner une ligne pour le mettre à jour");
    let id = ids[0];
    let entityData = this.Bl.findById(id);
    let modalTitle = "Modification : " + entityData;
    this.showEntityForm(entityData,modalTitle);
  }

  /** 
   * Supprimer une ligne 
  */
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
   * Action de button enregistrer de la forme : Add et Update
   */
  saveEntityRow(entityRow){

      this.Bl.saveEntityRow(entityRow);

      
  }



  // getCreateOrEditEntityGmView(){
  //   let ids = this.getSelectedIds()
  //   if(ids.length == 0 ) throw("Vous devez selectionner une ligne pour le mettre à jour");
  //   let id = ids[0];
  //   let entityData = this.Bl.findById(id);
  //   return entityData;
  // }


}
