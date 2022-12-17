CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    product REFERENCES products(id),
    quantity integer,
    order_id REFERENCES orders(id),
    );