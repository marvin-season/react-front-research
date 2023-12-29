export const streamData = (onData: (v: string) => void) => {
    setInterval(() => {
        onData((10 * Math.random()).toFixed(2))
    }, 500)
}