class MembresTachesBL extends BaseBL{    

  constructor() {
    super();
    this.Dao = new MembresTachesDAO();
    this.Entity = MembreTache;
  }

  // findAllByIdProjet
  findAllByIdProjet(idProjet){
      let data = this.Dao.findAllByIdProjet(idProjet);
      return data;
  }
}