CREATE DATABASE IF NOT EXISTS quotes_db;
USE quotes_db;

CREATE TABLE IF NOT EXISTS quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar algunos datos de ejemplo
INSERT INTO quotes (author, content, rating) VALUES
('Albert Einstein', 'La imaginación es más importante que el conocimiento.', 5),
('Marie Curie', 'En la vida no hay nada que temer, solo hay que comprender.', 4),
('Steve Jobs', 'La innovación distingue a los líderes de los seguidores.', 3);