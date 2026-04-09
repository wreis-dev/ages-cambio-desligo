// chave ExchangeRate-API
const apiKey = '580dc453445459751867ee6d';

const inputQuantia = document.getElementById('quantia');
const selectOrigem = document.getElementById('moedaOrigem');
const selectDestino = document.getElementById('moedaDestino');
const btnConverter = document.querySelector('button');
const divResultado = document.querySelector('.resultado');

btnConverter.addEventListener('click', async () => {
    const quantia = inputQuantia.value;
    const moedaOrigem = selectOrigem.value;
    const moedaDestino = selectDestino.value;

    if (!quantia || quantia <= 0) {
        divResultado.innerText = "Por favor, insira um valor válido maior que zero.";
        return;
    }

    divResultado.innerText = "Calculando...";

    try {
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${moedaOrigem}/${moedaDestino}/${quantia}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            const valorConvertido = data.conversion_result.toFixed(2);

            divResultado.innerHTML = `Resultado: <strong>${valorConvertido} ${moedaDestino}</strong>`;
        } else {
            divResultado.innerText = "Erro ao buscar a cotação. Verifique as moedas.";
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        divResultado.innerText = "Erro de conexão. Tente novamente mais tarde.";
    }
});
