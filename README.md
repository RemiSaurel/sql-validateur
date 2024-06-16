# sql-validateur

`sql-validateur` is a TypeScript package for validating SQL queries. New features will be added in the future.

## 🚀 Installation

```bash
npm install @remisaurel/sql-validateur
```

## 🧑‍💻 Usage

### Parse a query
```typescript
import { parseSelectQuery } from '@remisaurel/sql-validateur';

const query = 'SELECT * FROM users WHERE id = 1';
const parsedQuery = parseSelectQuery(query);

console.log(parsedQuery); // Returns a SelectQuery object
```
