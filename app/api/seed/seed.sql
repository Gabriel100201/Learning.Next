-- Crear tabla users si no existe
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Insertar datos en la tabla users
INSERT INTO users (name, email) VALUES 
('John Doe', 'john@example.com'),
('Jane Doe', 'jane@example.com');
