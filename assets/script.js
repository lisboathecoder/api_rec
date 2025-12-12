const img = document.createElement('img');
const p = document.createElement('p');

document.getElementById('imagem').appendChild(img);
document.getElementById('imagemId').appendChild(img);
document.getElementById('nameId').appendChild(p);

async function buscarPersonagem() {
    const input = document.getElementById('nome').value.toLowerCase();
    try {
        const response = await fetch(`https://api.disneyapi.dev/character?name=${input}`);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            img.src = data.data[0].imageUrl;
            p.textContent = data.data.name
        } else {
            console.log('Personagem não encontrado');
            alert('Personagem não encontrado. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao buscar o/a Personagem:', error);
        alert('Erro ao buscar o personagem. Por favor, tente novamente.');
    }
}

async function buscarPersonagemId() {
    const input = document.getElementById('id').value;
    try {
        const response = await fetch (`https://api.disneyapi.dev/character/${input}`);
        const data = await response.json();

        if (data.data) {
            img.src = data.data.imageUrl;
            p.textContent = data.data.name;
        } else {
            console.log('Personagem não encontrado');
            alert('Personagem não encontrado. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao buscar o/a Personagem pelo ID:', error);
        alert('ID inválido. Por favor, tente novamente.');
    }
}
