const  bounceIDs: { [name: string]: number } = {};

export default (name: string, fn: (...args: any[]) => any, delay: number = 2000) => {
    const id = bounceIDs[name];
    clearTimeout(id);
    bounceIDs[name] = setTimeout(fn, delay);
};
