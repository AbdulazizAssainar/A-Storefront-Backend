CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    order_id integer REFERENCES users(id),
    product_id integer REFERENCES products(id),
    quantity  VARCHAR(20)
    );