-- name: GetUser :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;

-- name: ListUsers :many
SELECT * FROM users
ORDER BY name;

-- name: CreateUser :one
INSERT INTO users (
    id, name, email, last_name, document, password
) VALUES (
    $1, $2, $3, $4, $5, $6
)
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;