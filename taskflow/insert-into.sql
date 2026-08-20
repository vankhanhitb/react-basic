INSERT INTO public."Project" ("name", "description", "updatedAt")
VALUES ('Course Platform', 'Online course management system', CURRENT_TIMESTAMP),
('E-commerce Store', 'Product and order management system', CURRENT_TIMESTAMP),
('Task Manager', 'Team task management application', CURRENT_TIMESTAMP)
RETURNING *;