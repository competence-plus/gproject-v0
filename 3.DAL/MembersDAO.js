class MembresDAO extends BaseDAO{    
 
  constructor() {
    super();
    this.sheetName = "MembresTable";
    this.initTamotsu();
    this.Entity = Membre;
  }


  findByVilleId(villeId){
   let data =  this.table.where({IdVille: villeId}).all();
    return data;
  }

}