export class NumberUtils {

    static parseNumber(value: string): number {
        value = value.replace(".", "");
        value = value.replace(",", ".");
        return parseFloat(value);
    }

    static valueGtZero(value: number): boolean {
        return value > 0
    }

}