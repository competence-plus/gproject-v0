class PhasesProjetsBL extends BaseBL{    

  constructor() {
    super();
    this.Dao = new PhaseProjetsDAO();
    this.Entity = PhaseProjet;
  }

}