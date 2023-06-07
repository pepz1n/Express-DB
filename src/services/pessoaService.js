import db from "../config/db";

async function getAll() {
  const sql = 'select * from pessoas';
  const pessoas = await db.query(sql);
  return pessoas.rows;
}

async function create(dados) {
  const sql = `insert into pessoas
              (nome, cpfcnpj, celular, email, endereco, numero, bairro ,complemento, cep, municipio, uf, ibge_municipio)
              values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning id;`;

              const { nome, cpfcnpj, celular, email, endereco, numero, bairro ,complemento, cep, municipio, uf, ibge_municipio } = dados;

              const query = await db.query(sql, [nome, cpfcnpj, celular, email, endereco, numero, bairro ,complemento, cep, municipio, uf, ibge_municipio]);
  return {
    message: 'criado com sucesso!',
    data: {
      id: query.rows[0].id
    }
  }
}

export default {
  getAll,
  create,
}
