export type Order = 'asc' | 'desc';

export interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

export interface Row {
    rowNumber: number,
    name: string,
    calories: number,
    fat: number,
    carbo: number,
    protein: number

}
export interface Rows {
    table: Array<Row>,
    removeRow: (index: Array<number>) => void
}