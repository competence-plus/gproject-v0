class MembresEquipesDAO extends BaseDAO{    
 
  constructor() {
    super();
    this.sheetName = "MembresEquipesTable";
    this.initTamotsu();
    this.Entity = MembreEquipe;
  }

}