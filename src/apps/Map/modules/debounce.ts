function debounce(func: () => void, timeout = 300): () => void {
    let timer: null | ReturnType<typeof setTimeout>;
    return (...args: Parameters<typeof func>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

export default debounce;
