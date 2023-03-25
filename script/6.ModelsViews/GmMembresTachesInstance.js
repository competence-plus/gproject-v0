// Gestion de l'instance : GenericManager 
class GmMembresTachesInstance extends GmBaseInstance{
 
  constructor(idProjet) {
    super()
    this.idProjet = idProjet;
    this.titre = "Gestion des tâches";
    this.tableName = "MembresTachesTable";
    this.entityName = "MembreTache";
    this.Bl = new MembresTachesBL();
    this.columnsNames = ["Id","Tache","PhaseToString","MembreToString","RemarquesChefProjet","Livrable","Etat","DateDebut","DateFin"];
    this.columnsTitles =  ["Id","Tâche","Phase","Membre","Remarques chef de projet","Livrable","Etat","Date début","Date fin"];;
    this.entityForm = "5.Views/MembreTacheForm";

    // SheetName
    let projet = new ProjetsBL().findById(idProjet);
    this.idProjet = idProjet
    this.sheetName = this.titre + "-" + projet.Nom ;

    this.initSheet();
    this.idEntityFilter1Range.setValue(idProjet);

    // Modal 
    this.formWidth =  850;
    this.formHeight = 500;

  }

  refreshData(){
    let data = this.Bl.findAllByIdProjet(this.idProjet);
    this.showData(data);
  }

  /**
   * redéfinition de la méthode getEntityFormTemplate 
   * pour ajouter la liste des questions
   */
  getEntityFormTemplate(entity){
    let questions = new QuestionsBL().findByIdProjet(this.idProjet);
    let phasesProjet = new PhasesProjetsBL().findByIdProjet(this.idProjet);
    let membres = new MembresBL().findAll();

    let template = super.getEntityFormTemplate(entity);
    template.questions = JSON.stringify(questions);
    template.phasesProjet = JSON.stringify(phasesProjet);
    template.membres = JSON.stringify(membres);
    template.idProjet = this.idProjet;
    return template;
  }




}

 