import pessoaController from "../controllers/pessoaController";

export default (app) => {
  app.get('/pessoas/get-all', pessoaController.getAll);
  app.post('/pessoas/create', pessoaController.create);
}
