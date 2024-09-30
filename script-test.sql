CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    balance NUMERIC DEFAULT 0
);

CREATE TABLE IF NOT EXISTS movements (
    id SERIAL PRIMARY KEY,
    movement_type VARCHAR(10) CHECK (movement_type IN ('revenue', 'expense')) NOT NULL,
    value NUMERIC NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
