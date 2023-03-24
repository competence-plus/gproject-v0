class EquipesBL extends BaseBL{    

  constructor() {
    super();
    this.Dao = new EquipesDAO();
    this.Entity = Equipe;
  }

}