export function Currency(x: number) {
    // return x.toLocaleString('ID', { style: 'currency', currency: 'IDR', currencyDisplay: 'symbol' });
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
