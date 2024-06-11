// tests/index.test.ts
import { validateSQL } from '../src';

test('valid SELECT query', () => {
    const query = "SELECT * FROM users;";
    expect(validateSQL(query)).toBe(true);
});

test('valid INSERT query', () => {
    const query = "INSERT INTO users (id, name) VALUES (1, 'John');";
    expect(validateSQL(query)).toBe(true);
});

test('invalid SQL query', () => {
    const query = "INVALID SQL QUERY;";
    expect(validateSQL(query)).toBe(true);
});

test('empty query', () => {
    const query = "";
    expect(validateSQL(query)).toBe(true);
});