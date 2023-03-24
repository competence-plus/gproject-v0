class MembreEquipe extends Entity{    

  constructor(object) {
    super(object);
    if(!object){

      this.Id = ""
      this.IdEquipe = ""
      this.IdMembre = ""

      this.DateCreation = new Date();
      this.DateModification = new Date();
      this.ToString = "";
    }else{

      this.Id = object.Id;
      this.IdEquipe =object.IdEquipe;
      this.IdMembre = object.IdMembre;

      this.DateCreation = object.DateCreation;
      this.DateModification = object.DateModification;
      this.ToString = object.ToString;
    }


  }

  toString() {
    return this.Id;
  }
 

}