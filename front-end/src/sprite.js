import domready from 'domready';

let symbols = require.context('./static/svg/', true, /\.svg/);

domready(() => {
    const node = document.getElementById('sprites');

    symbols.keys().forEach(k => {
        let temp = document.createElement('div');
        temp.innerHTML = symbols(k).default.content;

        node.appendChild( temp );
    });
});