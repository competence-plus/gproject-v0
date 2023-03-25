class QuestionsDAO extends BaseDAO{    
 
  constructor() {
    super();
    this.sheetName = "QuestionsTable";
    this.initTamotsu();
    this.Entity = Question;
  }

  findByIdProjet(idProjet){
    let dataRows =  this.table.where({
      IdProjet: idProjet
    }).all();
    return this.convertDataRowsToListObjects(dataRows);
  }


}