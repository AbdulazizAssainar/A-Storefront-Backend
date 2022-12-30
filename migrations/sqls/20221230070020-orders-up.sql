CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    product VARCHAR(800),
    amount VARCHAR(800),
    status bit
    );