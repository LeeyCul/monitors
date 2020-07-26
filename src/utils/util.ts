export function arrayChunk(array: any[], size: number) {
    let data = [];
    for (let i = 0; i < array.length; i += size) {
        data.push(array.slice(i, i + size));
    }
    return data;
}

export function groupBy(array: any[] = [], page: number) {
    let result = [];
    const len = array.length;
    for (let i = 0; i < len; i += page) {
        if (array.length) {
            result.push(array.slice(i, i + page));
        }
    }
    return result;
}
