export function calculateMagiq(dataLength: number, currentIndex: number): number {
    if (dataLength <= 0 || currentIndex < 0 || currentIndex >= dataLength) {
        return 0;
    }
    
    // For each position, calculate: (sum of 1/i from position to dataLength) / dataLength
    // But with zeros for positions before currentIndex
    let sum = 0;
    
    for (let i = 1; i <= dataLength; i++) {
        if (i > currentIndex) {
            // Add 1/i for positions after currentIndex
            sum += 1 / i;
        }
        // For positions <= currentIndex, add 0 (which doesn't change the sum)
    }
    
    return parseFloat((sum / dataLength).toFixed(4));
}
