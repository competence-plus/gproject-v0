// Gestion de l'instance : GenericManager 
class GmMembresInstance extends GmBaseInstance{
 
  constructor() {
    super()
    this.tableName = "MembresTable";
    this.entityName = "Membre";
    this.Bl = new MembresBL();
    this.titre = "Gestion des membres";
    this.sheetName = this.titre;
    this.columnsNames = ["Id","Nom","Prenom","Email"];
    this.columnsTitles = ["Id","Nom","Prénom","E-mail"];
    this.entityForm = "5.Views/MembreForm";

    this.initSheet();
  }

}