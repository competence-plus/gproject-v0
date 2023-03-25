class PhasesProjetsDAO extends BaseDAO{    
 
  constructor() {
    super();
    this.sheetName = "PhasesProjetsTable";
    this.initTamotsu();
    this.Entity = PhaseProjet;
  }

  findByIdProjet(idProjet){
    let dataRows =  this.table.where({
      IdProjet: idProjet
    }).all();
    return this.convertDataRowsToListObjects(dataRows);
  }

}