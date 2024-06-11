export type Column = string;
export type Table = string;
export type Operator = "=" | "<" | ">" | "<=" | ">=" | "!=" | "LIKE";
export type Value = string | number | boolean;

export interface Condition {
    column: Column;
    operator: Operator;
    value: Value;
}

export interface SelectQuery {
    columns: Column[];
    from: Table;
    where?: Condition[];
    groupBy?: Column[];
    having?: Condition[];
    orderBy?: Column[];
}