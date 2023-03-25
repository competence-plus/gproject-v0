class Question extends Entity{    

  constructor(object) {
    super(object);
    if(!object){

      this.Id = ""
      this.IdProjet = ""
      this.IdPhase = ""
      this.Question = "";
      this.Description = "";

      this.DateCreation = new Date();
      this.DateModification = new Date();
      this.ToString = "";
    }else{
      
      this.Id = object.Id;
      this.IdProjet = object.IdProjet;
      this.IdPhase = object.IdPhase;
      this.Question = object.Question;
      this.Description = object.Description;

      this.DateCreation = object.DateCreation;
      this.DateModification = object.DateModification;
      this.ToString = object.ToString;
    }

  }

  toString() {
    return this.Question;
  }
 

}