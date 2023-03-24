// Gestion de l'instance : GenericManager 
class GmMembresInstance extends GmBaseInstance{
 
  constructor() {
    super()
    this.tableName = "MembresTable";
    this.sheetName = "Gestionnaire";
    this.entityName = "Membre";
    this.Bl = new MembresBL();
    this.titre = "Gestion des membres";
    this.columnsNames = ["Id","Nom","Prenom","Email"];
    this.columnsTitles = ["Id","Nom","Prénom","E-mail"];
    this.entityForm = "MembreForm";
  }



}

function TestMembresGmanagerInstance(){

  let membresGmanagerInstance = new MembresGmanagerInstance();
  membresGmanagerInstance.deleteRow();

}