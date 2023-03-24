class TachesDAO extends BaseDAO{    
 
  constructor() {
    super();
    this.sheetName = "TachesTable";
    this.initTamotsu();
    this.Entity = Tache;
  }

}