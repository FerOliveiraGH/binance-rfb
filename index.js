require('dotenv-safe').config();

const { transferencia } = require("./src/transferencia");
const { retirada } = require("./src/retirada");
const { compraVenda } = require("./src/compra_venda");
const { permuta } = require("./src/permuta");
const { saveRfbFile } = require("./src/utilities");


async function load() {
    let year = 2022;
    let month = 8;

    let file = "";

    let symbolsCompraVenda = ['ETH', 'BTC', 'BUSD'];

    let symbolsPermuta = [
        ['ETH', 'BUSD'],
        ['BTC', 'BUSD'],
    ];

    file += await compraVenda(symbolsCompraVenda, year, month);
    file += await permuta(symbolsPermuta, year, month)
    file += await transferencia(year, month);
    file += await retirada(year, month);

    await saveRfbFile(year, month, file);
}

if (require.main === module) {
    console.log('Process start.');
    console.log('Wait a moment...');

    load().then(() => {
        console.log('Process end.');
    });
}
