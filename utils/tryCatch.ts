
export async function tryCatch<T>(promise: Promise<T>): Promise<[T | null, null | unknown]> {
    try {
        const data = await promise
        return [data, null]
    }
    catch (err) {
        return [null, err]
    }
}