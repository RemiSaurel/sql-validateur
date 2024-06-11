import {Column, Condition, Operator, SelectQuery, Value} from "./types/types";

export const validateSQL = (query: string): boolean => {
    try {
        const parsedQuery: SelectQuery = parseSelectQuery(query);

        return !(parsedQuery.columns.length === 0 || !parsedQuery.from);
    } catch (error) {
        return false;
    }
}

export const parseSelectQuery = (query: string): SelectQuery => {
    const tokens = query.trim().split(/\s+/);
    const selectIndex = tokens.findIndex(token => token.toUpperCase() === "SELECT");
    const fromIndex = tokens.findIndex(token => token.toUpperCase() === "FROM");
    if (selectIndex === -1 || fromIndex === -1 || fromIndex <= selectIndex + 1)
        throw new Error("Invalid SELECT query");

    const columns = tokens.slice(selectIndex + 1, fromIndex);

    const from = tokens[fromIndex + 1];

    const whereIndex = tokens.findIndex(token => token.toUpperCase() === "WHERE");
    let where: Condition[] = [];
    if (whereIndex !== -1 && whereIndex > fromIndex) {
        const whereClause = tokens.slice(whereIndex + 1).join(" ");
        const conditionTokens = whereClause.split(/\b(?:AND|OR)\b/);
        where = conditionTokens.map(token => {
            const [column, operator, value] = token.trim().split(/\s+/);
            return { column, operator: operator as Operator, value: parseValue(value) };
        });
    }

    const groupByIndex = tokens.findIndex(token => token.toUpperCase() === "GROUP" && tokens.indexOf("BY") === tokens.indexOf("GROUP") + 1);
    let groupBy: Column[] = [];
    if (groupByIndex !== -1) {
        const groupByClause = tokens.slice(groupByIndex + 2); // Skip "GROUP BY"
        groupBy = groupByClause.filter(token => token.toUpperCase() !== "HAVING");
    }

    const havingIndex = tokens.findIndex(token => token.toUpperCase() === "HAVING");
    let having: Condition[] = [];
    if (havingIndex !== -1) {
        const havingClause = tokens.slice(havingIndex + 1).join(" ");
        const conditionTokens = havingClause.split(/\b(?:AND|OR)\b/);
        having = conditionTokens.map(token => {
            const [column, operator, value] = token.trim().split(/\s+/);
            return { column, operator: operator as Operator, value: parseValue(value) };
        });
    }

    const orderByIndex = tokens.findIndex(token => token.toUpperCase() === "ORDER" && tokens.indexOf("BY") === tokens.indexOf("ORDER") + 1);
    let orderBy: Column[] = [];
    if (orderByIndex !== -1) {
        orderBy = tokens.slice(orderByIndex + 2);
    }

    return { columns, from, where, groupBy, having, orderBy };
}

const parseValue = (value: string): Value => {
    const normalizedValue = value.trim().toUpperCase();
    if (/^\d+$/.test(normalizedValue)) {
        return parseInt(normalizedValue);
    } else if (/^\d+\.\d+$/.test(normalizedValue)) {
        return parseFloat(normalizedValue);
    } else if (normalizedValue === "TRUE") {
        return true;
    } else if (normalizedValue === "FALSE") {
        return false;
    } else {
        return value;
    }
}
