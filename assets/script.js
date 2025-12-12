const imgName = document.createElement('img');
const imgById = document.createElement('img');
const nameByIdEl = document.getElementById('nameId');
const nameByNameEl = document.getElementById('nameByName');
const idByNameEl = document.getElementById('idByName');

document.getElementById('imagem').appendChild(imgName);
document.getElementById('imagemId').appendChild(imgById);

async function buscarPersonagem() {
    const raw = document.getElementById('name').value.trim();
    if (!raw) {
        alert('Digite um nome para buscar.');
        return;
    }
    const input = raw.toLowerCase();
    try {
        const query = encodeURIComponent(input);
        const response = await fetch(`https://api.disneyapi.dev/character?name=${query}`);
        const data = await response.json();
        const list = Array.isArray(data.data) ? data.data : [];

        if (list.length > 0) {
            const norm = (s) => s
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .trim();
            const nInput = norm(raw);

            let chosen = list.find((c) => norm(c.name) === nInput);
            if (!chosen) chosen = list.find((c) => norm(c.name).includes(nInput));
            if (!chosen) chosen = list[0];

            imgName.src = chosen.imageUrl;
            imgName.alt = chosen.name || 'Character image';
            imgName.title = chosen.name || '';
            if (nameByNameEl) nameByNameEl.textContent = chosen.name || '';
            if (idByNameEl) idByNameEl.textContent = 'ID: ' + (chosen._id || '');
        } else {
            console.log('Personagem não encontrado');
            alert('Personagem não encontrado. Por favor, tente novamente.');
            if (nameByNameEl) nameByNameEl.textContent = '';
            if (idByNameEl) idByNameEl.textContent = '';
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
            return;
        } 
        if (data && data.data) {
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