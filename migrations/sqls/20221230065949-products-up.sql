CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price integer,
    category integer REFERENCES catagory(id),
    sales integer
    );