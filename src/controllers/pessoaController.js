import pessoaService from "../services/pessoaService";

async function getAll(_, res) {
  try {
    const resposta = await pessoaService.getAll()
    return res.status(200).send({
      message: 'Busca com sucesso!',
      data: resposta
    });
  } catch (error) {
    return res.status(500).send({
      erro: error.message
    });
  }
}

async function create(req, res) {
  try {
    const resposta = await pessoaService.create(req.body);
    return res.status(200).send(resposta);
  } catch (error) {
    return res.status(500).send({
      erro: error.message
    });
  }
}

export default {
  getAll,
  create
}
