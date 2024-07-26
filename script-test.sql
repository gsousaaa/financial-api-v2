CREATE TABLE IF NOT EXISTS users( 
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100),
    created_at VARCHAR(24),
    balance FLOAT DEFAULT 0 ,
    PRIMARY KEY(id) 
);


CREATE TABLE IF NOT EXISTS movements(
    id INT AUTO_INCREMENT NOT NULL, 
    movement_type ENUM('revenue', 'expense') NOT NULL,
    value FLOAT NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at VARCHAR(24),
    user_id INT NOT NULL,


    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    
    )


