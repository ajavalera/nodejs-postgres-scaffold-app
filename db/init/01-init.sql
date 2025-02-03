CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

INSERT INTO todos (title, completed) VALUES
  (Buy groceries, false),
  (Walk the dog, true),
  (Learn Docker, false);
