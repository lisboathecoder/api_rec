const imgPorNome = document.createElement("img");
const imgPorId = document.createElement("img");
const nomeElemento = document.getElementById("nameId");
const nomePorNome = document.getElementById("nameByName");
const idPorNome = document.getElementById("idByName");

document.getElementById("imagem").appendChild(imgPorNome);
document.getElementById("imagemId").appendChild(imgPorId);

async function buscarPersonagem() {
  const entrada = document.getElementById("name").value.trim();
  if (!entrada) {
    alert("Digite um nome para buscar.");
    return;
  }

  try {
    const consulta = encodeURIComponent(entrada);
    const resposta = await fetch(
      `https://api.disneyapi.dev/character?name=${consulta}`
    );
    const dados = await resposta.json();
    const lista = Array.isArray(dados.data) ? dados.data : [];

    if (lista.length === 0) {
      alert("Personagem não encontrado.");
      nomePorNome.textContent = "";
      idPorNome.textContent = "";
      return;
    }

    const normalizar = (texto) =>
      texto // essa função é pra normalizar o texto
        .toLowerCase()
        .trim();

    const entradaNorm = normalizar(entrada);
    const personagem =
      lista.find((p) => normalizar(p.name) === entradaNorm) ||
      lista.find((p) => normalizar(p.name).includes(entradaNorm)) ||
      lista[0];

    imgPorNome.src = personagem.imageUrl;
    imgPorNome.alt = personagem.name;
    nomePorNome.textContent = personagem.name;
    idPorNome.textContent = `ID: ${personagem._id}`;
  } catch (erro) {
    console.error("Erro ao buscar personagem:", erro);
    alert("Erro ao buscar personagem.");
  }
}

async function buscarPersonagemId() {
  const id = document.getElementById("id").value;

  try {
    const resposta = await fetch(`https://api.disneyapi.dev/character/${id}`);
    const dados = await resposta.json();

    if (resposta.status === 404) {
      alert("Personagem não encontrado, tente outro ID.");
      return;
    }
    if (resposta.status !== 200 || !dados.data) {
      alert("Personagem não encontrado, tente outro ID.");
      return;
    }

    imgPorId.src = dados.data.imageUrl;
    nomeElemento.textContent = dados.data.name;
  } catch (erro) {
    console.error("Erro ao buscar personagem por ID:", erro);
    alert("ID inválido.");
  }
}
