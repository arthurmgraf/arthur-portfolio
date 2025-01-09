let translations = {}; // Variável para armazenar as traduções carregadas

// Função para mudar o idioma
async function changeLanguage(lang) {
    try {
        // Carrega o arquivo JSON correspondente ao idioma selecionado
        const response = await fetch(`../translations/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo de tradução: ${response.statusText}`);
        }
        translations = await response.json();

        // Atualiza os textos no HTML
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate'); // Obtém a chave de tradução
            if (translations[key]) {
                element.innerText = translations[key]; // Aplica o texto traduzido
            } else {
                console.warn(`Chave de tradução não encontrada: ${key}`);
            }
        });

        // Atualiza o título da página
        if (translations['title']) {
            document.title = translations['title'];
        }
    } catch (error) {
        console.error("Erro ao mudar o idioma:", error);
    }
}

// Define o idioma padrão ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('en'); // Idioma padrão: inglês
});

console.log(translations); // Exibe o conteúdo do JSON carregado
