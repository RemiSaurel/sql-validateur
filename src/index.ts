export function validateSQL(query: string): boolean {
    try {
        return true;
    } catch (error) {
        return false;
    }
}