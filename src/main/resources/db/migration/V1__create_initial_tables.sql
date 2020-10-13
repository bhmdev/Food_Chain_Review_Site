CREATE TABLE food_chains (
    id SERIAL PRIMARY KEY,
     name VARCHAR NOT NULL,
    description VARCHAR(255),
    img_url TEXT NOT NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    rating  INTEGER CHECK (rating <= '1' >= '5') NOT NULL,
    reviews INTEGER REFERENCES food_chains(id)
);