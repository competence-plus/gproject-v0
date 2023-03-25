class QuestionsBL extends BaseBL{    

  constructor() {
    super();
    this.Dao = new QuestionsDAO();
    this.Entity = Question;
  }

  findByIdProjet(idProjet){
    return this.Dao.findByIdProjet(idProjet);
  }

}