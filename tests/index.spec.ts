// tests/index.test.ts
import { validateSQL } from '../src';

test('valid SELECT query', () => {
    const query = "SELECT * FROM users;";
    expect(validateSQL(query)).toBe(true);
});

test('valid SELECT with complex', () => {
    const query = "SELECT * FROM users WHERE age > 45 AND name = 'toto';";
    expect(validateSQL(query)).toBe(true);
});

test('invalid SELECT with complex', () => {
    const query = "SELECT * FRO users WHERE age > 45 AND name = 'toto';";
    expect(validateSQL(query)).toBe(false);
});

test('valid INSERT query', () => {
    const query = "INSERT INTO users (id, name) VALUES (1, 'John');";
    expect(validateSQL(query)).toBe(false);
});

test('invalid SQL query', () => {
    const query = "INVALID SQL QUERY;";
    expect(validateSQL(query)).toBe(false);
});

test('empty query', () => {
    const query = "";
    expect(validateSQL(query)).toBe(false);
});
