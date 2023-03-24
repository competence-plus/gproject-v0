class MembresTachesBL extends BaseBL{    

  constructor() {
    super();
    this.Dao = new MembresTachesDAO();
    this.Entity = MembreTache;
  }

}