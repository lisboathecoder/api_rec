const img = document.createElement('img');
document.getElementById('imagem').appendChild(img);
async function buscarCosmestico() {
    const input = document.getElementById('name').value.toLowerCase();
    try {
        const response = await fetch(`https://api.disneyapi.dev/character?name=${input}`);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            img.src = data.data[0].imageUrl;
        }
    } catch (error) {
        console.error('Erro ao buscar o personagem:', error);
    }
}