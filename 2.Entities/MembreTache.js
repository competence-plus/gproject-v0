class MembreTache extends Entity{    

  constructor(object) {
    super(object);
    if(!object){
      this.Id = ""
      this.IdTache = ""
      this.IdMembre = ""

      
      this.Remarque = "";
      this.Livrable = "";
      this.Etat = "";
      this.DateDebut = "";
      this.DateFin = "";

      this.DateCreation = new Date();
      this.DateModification = new Date();
      this.TacheToString = "";
      this.MembreToString = "";
      this.PhaseToString = "";
      this.ProjetToString = "";
      this.ToString = "";
    }else{

      this.Id = object.Id;
      this.IdTache = object.IdTache;
      this.IdMembre = object.IdMembre;


      this.Remarque = object.Remarque;
      this.Livrable = object.Livrable;
      this.Etat = object.Etat;
      this.DateDebut = object.DateDebut;
      this.DateFin = object.DateFin;

      this.TacheToString = object.TacheToString;
      this.MembreToString = object.MembreToString;
      this.PhaseToString = object.PhaseToString;
      this.ProjetToString = object.ProjetToString;
      this.ToString = object.ToString;

    }


  }

  toString() {
    return this.TacheToString;
  }
 

}