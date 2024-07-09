document.getElementById('convertir').addEventListener('click', async () => {
    const montoCLP = document.getElementById('buscar-clp').value;
    const tipoMoneda = document.getElementById('tipo-moneda').value;
    const resultadoDiv = document.getElementById('valor');

    if (!montoCLP || !tipoMoneda) {
        resultadoDiv.textContent = 'Por favor, ingrese un monto y seleccione una moneda.';
        return;
    }

    try {
        const response = await fetch('https://mindicador.cl/api');
        const data = await response.json();

        let tasaCambio;
        switch (tipoMoneda) {
            case 'dolar':
                tasaCambio = data.dolar.valor;
                break;
            case 'euro':
                tasaCambio = data.euro.valor;
                break;
            case 'uf':
                tasaCambio = data.uf.valor;
                break;
            default:
                resultadoDiv.textContent = 'Tipo de moneda no válido.';
                return;
        }

        const montoConvertido = (montoCLP / tasaCambio).toFixed(2);
        resultadoDiv.textContent = `Resultado: ${montoConvertido} ${tipoMoneda.toUpperCase()}`;


    } catch (error) {
        resultadoDiv.textContent = 'Error al obtener la tasa de cambio. Inténtelo de nuevo más tarde.';
    }
});

