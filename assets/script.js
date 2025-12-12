const img = document.createElement('img');
document.getElementById('imagem').appendChild(img);

async function buscarPersonagem() {
    const input = document.getElementById('nome').value.toLowerCase();
    try {
        const response = await fetch(`https://api.disneyapi.dev/character?name=${input}`);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            img.src = data.data[0].imageUrl;
        } else {
            console.log('Personagem não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar o/a Personagem:', error);
    }
}