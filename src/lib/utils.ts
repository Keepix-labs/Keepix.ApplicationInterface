export const getErrorMsg = (e: unknown) => {
    if (typeof e === 'string') {
        return e;
    }

    if (e instanceof Error) {
        return e.message;
    }

    return 'Error';
}