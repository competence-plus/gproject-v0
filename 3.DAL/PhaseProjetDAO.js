class PhasesProjetsDAO extends BaseDAO{    
 
  constructor() {
    super();
    this.sheetName = "PhasesProjetsTable";
    this.initTamotsu();
    this.Entity = PhaseProjet;
  }

}