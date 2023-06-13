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

async function editPessoa(dados, idEdicao) {
  let fields = [];

  Object.keys(dados).forEach(e => {
    if (e !== 'id') {
      if (dados[e] === '' || dados[e] == null) {
        fields.push(`${e} = null`)
      } else {
        fields.push(`${e} = '${dados[e]}'`)
      }
    }
  });
  console.log(Object.keys(dados));
  fields = fields.join(', ');
  const sql = `update pessoas set ${fields} where id = ${idEdicao}`;

  const response = await db.query(sql);

  const msg = response.rowCount === 0
  ? `Não foi encontrado nenhum registro com o id ${idEdicao}`
  : `Registro ${idEdicao} alterado com sucesso!`;

  return { message: msg }
}

const excluir = async (id) => {
  let sql = 'delete from pessoas where id = $1;';
  let query = await db.query(sql, [id]);
  return {
    deletado: query.rowCount == 1,
    id
  }
}

export default {
  getAll,
  create,
  editPessoa,
  excluir
}
