class TachesBL extends BaseBL{    

  constructor() {
    super();
    this.Dao = new TachesDAO();
    this.Entity = Tache;
  }

}