// Gestion de l'instance : GenericManager 
class GmMembresTachesInstance extends GmBaseInstance{
 
  constructor() {
    super()
    this.tableName = "MembresTachesTable";
    this.sheetName = "Gestionnaire";
    this.entityName = "MembreTache";
    this.Bl = new MembresTachesBL();
    this.titre = "Réalisation des tâches";
    this.columnsNames = ["Id","TacheToString","MembreToString","Remarque","Livrable","Etat","DateDebut","DateFin"];
    this.columnsTitles =  ["Id","Tâche","Membre","Remarque","Livrable","Etat","Date début","Date fin"];;
    this.entityForm = "MembreTacheForm";
  }

}

 