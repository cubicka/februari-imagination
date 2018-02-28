export function Currency(x: number) {
    // return x.toLocaleString('ID', { style: 'currency', currency: 'IDR', currencyDisplay: 'symbol' });
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function Waktu(dd: Date) {
    const d = new Date(dd);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
}
