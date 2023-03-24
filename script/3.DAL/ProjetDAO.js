class ProjetsDAO extends BaseDAO{    
 
  constructor() {
    super();
    this.sheetName = "ProjetsTable";
    this.initTamotsu();
    this.Entity = Projet;
  }

}