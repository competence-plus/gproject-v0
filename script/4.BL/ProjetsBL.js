class ProjetsBL extends BaseBL{    

  constructor() {
    super();
    this.Dao = new ProjetsDAO();
    this.Entity = Projet;
  }

}