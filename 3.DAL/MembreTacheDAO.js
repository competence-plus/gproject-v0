class MembresTachesDAO extends BaseDAO{    
 
  constructor() {
    super();
    this.sheetName = "MembresTachesTable";
    this.initTamotsu();
    this.Entity = MembreTache;
    this.toStringColumnsNames = ["TacheToString","TacheToString","MembreToString","PhaseToString","ProjetToString"];
  }

}