import lodash from 'lodash';

export function IsArray(x: any) {
    return Object.prototype.toString.call(x) === '[object Array]';
}

export function ProjectObj<T, K extends keyof T>(obj: T, attrs: K[]): Pick<T, K> {
    if (!obj) return obj;

    return attrs.reduce((accum, attr: K) => {
        accum[attr] = obj[attr];
        return accum;
    }, {} as Pick<T, K>);
}

export function ExpandObjs<T, K>(_objs: T | T[], expansion: K): Array<T & K> {
    const objs = IsArray(_objs) ? _objs as T[] : [_objs] as T[];
    return objs.map(obj => (Object.assign(obj, expansion)));
}

export function ExpandObj<T, U>(obj: T, expansion: U): T & U {
    return lodash.assign({}, obj, expansion);
}

export function ArrToObj<T>(arr: T[], identityFn: (obj: any) => string): { [x in string]: T } {
    return lodash.reduce(arr, (accum, obj) => {
        accum[identityFn(obj)] = obj;
        return accum;
    }, {} as { [x in string]: T });
}

export function GroupBy<T>(arr: T[], identityFn: (obj: any) => string): { [x in string]: T[] } {
    return lodash.groupBy(arr, identityFn);
}

export function ProjectArr(arr: any[], ids: string[], identityFn = lodash.identity): any[] {
    const filteredArr = lodash.filter(arr, item => (ids.indexOf(identityFn(item)) > -1));
    const obj = ArrToObj(filteredArr, identityFn);
    return ids.map(id => (obj[id]));
}

export function DeepAttrs(obj: object, attrs: string[]) {
    return lodash.reduce(attrs, (deepObj: any, attr): any => {
        if (!deepObj || !deepObj.hasOwnProperty(attr)) {
            return undefined;
        }

        return deepObj[attr];
    }, obj);
}

export function IsObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function MergeDeep(target: any, source: any) {
    if (!IsObject(target) || !IsObject(source)) return source;

    const output = Object.assign({}, target);
    Object.keys(source).forEach(key => {
        if (IsObject(source[key]) && (key in target)) {
            output[key] = MergeDeep(target[key], source[key]);
        } else {
            Object.assign(output, { [key]: source[key] });
        }
    });

    return output;
}

export function CleanQuery(s: string) {
    if (s === undefined) return s;
    const trimmed = s.trim();

    if (trimmed[0] === '\"' && trimmed[trimmed.length - 1] === '\"') {
        return trimmed.substring(1, trimmed.length - 1);
    }

    if (trimmed[0] === '[' && trimmed[trimmed.length - 1] === ']') {
        return trimmed.substring(1, trimmed.length - 1);
    }

    return trimmed;
}

// export function NullifyUndefined<T, K extends keyof T>(obj: T, attrs: K[]): T & Pick<T, K> {
//     return attrs.reduce((accum, attr) => {
//         accum[attr] = accum[attr] || null;
//         return accum;
//     }, lodash.assign({}, obj) as T & Pick<T, K>);
// }
