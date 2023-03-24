class MembresBL extends BaseBL{    

  constructor() {
    super();
    this.Dao = new MembresDAO();
    this.Entity = Membre;
  }

}