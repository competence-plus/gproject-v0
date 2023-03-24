class Projet extends Entity{    

  constructor(object) {
    super(object);
    if(!object){

      this.Id = ""
      this.Nom = "";
      this.Description = "";

      this.DateCreation = new Date();
      this.DateModification = new Date();
      this.ToString = "";
    }else{

      this.Id = object.Id;
      this.Nom = object.Nom;
      this.Description = object.Description;

      this.DateCreation = object.DateCreation;
      this.DateModification = object.DateModification;
      this.ToString = object.ToString;
    }


  }

  toString() {
    return this.Nom;
  }
 

}