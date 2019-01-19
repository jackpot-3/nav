# Project Name

> Amazon Profile Page Clone

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Update package.json "schema" script with correct database user
> Update /server/db/db.js with correct database user and password
> npm run schema
> npm run seed
> npm run build
> npm start

##API methods
Get products
- route: GET /:category/:query
- inputs: category, query 
- output: array of top 10 products matching query and category

```
SELECT * FROM products WHERE name = '${name}'
```

Add a product
- route: POST /product
```
INSERT INTO products (id, name, categoryid, popularity) VALUES ($1, $2, $3, $4)
data: {
  id: INTEGER PRIMARY KEY,
  name: VARCHAR(32),
  categoryid: INTEGER,
  popularity: INTEGER,
}
```

Update a product
- route: PUT/product/:id
```
UPDATE products SET, name = '${params[0]}', categoryid = ${params[1]}, popularity = ${params[2]} WHERE id = ${id}
```

Delete a product
- route: DELETE/product/:id
```
DELETE FROM products WHERE id = ${id}
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

