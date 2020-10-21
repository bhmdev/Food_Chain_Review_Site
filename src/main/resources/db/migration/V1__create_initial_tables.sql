CREATE TABLE food_chains (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    rating NUMERIC(2,1),
    delivery BOOLEAN NOT NULL,
    description VARCHAR(255),
    img_url TEXT NOT NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    comment VARCHAR,
    rating  INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    food_chain_id INTEGER REFERENCES food_chains(id) NOT NULL
);