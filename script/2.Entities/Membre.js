class Membre extends Entity{    

  constructor(object) {
    super(object);
    if(!object){
      this.Id = ""
      this.Photo = "";
      this.Nom = "";
      this.Prenom = "";
      this.DateNaissance = "";
      this.Telephone = "";
      this.Email = "";
      this.Adresse = "";
      this.Type = "";
      this.DateCreation = new Date();
      this.DateModification = new Date();
      this.ToString = "";
    }else{
      this.Id = object.Id;
      this.Photo = object.Photo;
      this.Nom = object.Nom;
      this.Prenom = object.Prenom;
      this.DateNaissance = object.DateNaissance;
      this.Telephone = object.Telephone;
      this.Email = object.Email;
      this.Adresse = object.Adresse;
      this.Type = object.Type;
      this.DateCreation = object.DateCreation;
      this.DateModification = object.DateModification;
      this.ToString = object.ToString;
    }



  }

  toString() {
    return this.Nom + " " + this.Prenom;
  }
 

}