class BaseDAO {
  constructor() {
    // this.nombreLigneParPage = 20;
    this.spreadsheet = SpreadsheetApp.getActive();
    this.sheetName = undefined;
    this.table = undefined;
    this.Entity = undefined;
    this.toStringColumnsNames = undefined;
    
  }

  initTamotsu(){
    Tamotsu.initialize();
    this.table = Tamotsu.Table.define({ 
      sheetName: this.sheetName,
      idColumn: 'Id'
      });
  }

  // Retourne tous les ville
  findAll(){
    var data;
    let rowsObjects = this.table.all();
    data = rowsObjects.map( rowObject => {
       return new this.Entity(rowObject)
    })
    return data;
  }

  findById(id){
    console.log(this.sheetName);
    let dataRow = this.table.find(id);
    let entity = new this.Entity(dataRow);
    return entity;

  }
  deleteEntity(id){
    let entity = this.table.find(id);
    entity.destroy();
  }
  create(entity){
    this.deleteToStringProperty(entity);
    entity.DateCreation = new Date();
    entity.DateModification = new Date();
    this.table.create(entity);
    this.clearToStringColumns();
  }
  update(entity){
    this.deleteToStringProperty(entity);
    entity.DateModification = new Date();

    Object
    this.table.update(entity);
  }

  deleteToStringProperty(entity){
    if(this.toStringColumnsNames) this.toStringColumnsNames.forEach(columnsName =>  delete entity[columnsName]);
  
  }

  clearToStringColumns(){
    let rangeString = this.sheetName + "!I2:L1000";
    let range = SpreadsheetApp.getActive().getRange(rangeString).clearContent();
    this.clearToStringColumns();
  }
}
