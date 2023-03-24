class PhaseProjet extends Entity{    

  constructor(object) {
    super(object);
    if(!object){
      this.Id = ""
      this.IdProjet = ""
      this.Nom = "";
      this.Ordre = "";

      this.DateCreation = new Date();
      this.DateModification = new Date();
      this.ToString = "";
      this.ProjetToString = "";

    }else{
      
      this.Id = object.Id;
      this.IdProjet = object.IdProjet;
      this.Nom = object.Nom;
      this.Ordre = object.Ordre;

      this.DateCreation = object.DateCreation;
      this.DateModification = object.DateModification;

      this.ProjetToString = object.Projet;
      this.ToString = object.ToString;
    }


  }

  toString() {
    return this.Id;
  }
 

}