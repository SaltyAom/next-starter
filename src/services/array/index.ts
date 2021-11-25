export const binarySearch = (arr: string[], val: string, start = 0, end = arr.length - 1): number => {
    // eslint-disable-next-line no-bitwise
    const mid = (start + end) >> 1

    if (val === arr[mid])
        return mid

    if (start >= end)
        return -1

    return val < arr[mid]
        ? binarySearch(arr, val, start, mid - 1)
        : binarySearch(arr, val, mid + 1, end);
}