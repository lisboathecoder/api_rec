const imgName = document.createElement('img');
const imgById = document.createElement('img');
const nameByIdEl = document.getElementById('nameId');

document.getElementById('imagem').appendChild(imgName);
document.getElementById('imagemId').appendChild(imgById);

async function buscarPersonagem() {
    const input = document.getElementById('name').value.trim().toLowerCase();
    try {
        const query = encodeURIComponent(input);
        const response = await fetch(`https://api.disneyapi.dev/character?name=${query}`);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            imgName.src = data.data[0].imageUrl;
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

        if(response.status !== 200) {
            console.log('Personagem não encontrado');
            alert('Personagem não encontrado, tente do id 10 ao id 10103');
        } 
        if (data.data) {
            imgById.src = data.data.imageUrl;
            if (nameByIdEl) nameByIdEl.textContent = data.data.name;
        } else {
            console.log('Personagem não encontrado');
            alert('Personagem não encontrado. Por favor, tente novamente.');
        }
    } catch (error) {
        
        console.error('Erro ao buscar o/a Personagem pelo ID:', error);
        alert('ID inválido. Por favor, tente novamente.');
    }
}
