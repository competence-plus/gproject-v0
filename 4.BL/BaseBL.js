class BaseBL{    

  constructor() {
    this.Dao = undefined;
    this.Entity = undefined;
  }

  findAll(){
    let data = this.Dao.findAll();
    return data;
  }
  findById(id){
    return this.Dao.findById(id);
  }

  deleteEntity(id){
    // Règle de gestion 
    this.Dao.deleteEntity(id);
  }

  saveEntityRow(entityRow){
     // if Update
    if(entityRow.Id){
      let entity = this.findById(entityRow.Id);
      Object.assign(entity,entityRow);
      this.update(entity);
    }
    // if Create 
    else {
      let entity =  new this.Entity();
      Object.assign(entity,entityRow);
      this.create(entity);
    }
  }

  create(entity){
    this.Dao.create(entity);
  }

  update(entity){
    this.Dao.update(entity);
  }

  newEntity(){
    return new this.Entity();
  }

  












}