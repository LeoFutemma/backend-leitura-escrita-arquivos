const { buscarEndereco } = require('utils-playground');
const fs = require('fs/promises');

async function buscarUmEndereco(req, res) {
  const { cep } = req.params;

  if (cep != Number(cep)) {
    return res.status(400).json("Insira apenas números como CEP");
  }

  try {
    const enderecos = await fs.readFile('./src/enderecos.json');
    const enderecosParse = JSON.parse(enderecos);

    const cepEncontrado = enderecosParse.find((enderecoCadastrado) => {
      return enderecoCadastrado.cep.replace('-', '') === cep;
    })

    if (cepEncontrado) {
      return res.status(400).json("Endereço já cadastrado");
    }

    const enderecoParaCadastro = await buscarEndereco(cep);
    enderecosParse.push(enderecoParaCadastro);

    await fs.writeFile('./src/enderecos.json', JSON.stringify(enderecosParse));

    return res.status(201).json("Endereço cadastrado com sucesso!");

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = buscarUmEndereco;