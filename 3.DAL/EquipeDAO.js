class EquipesDAO extends BaseDAO{    
 
  constructor() {
    super();
    this.sheetName = "EquipesTable";
    this.initTamotsu();
    this.Entity = Equipe;
  }

}