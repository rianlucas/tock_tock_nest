package service

import (
	"context"
	"github.com/google/uuid"

	"github.com/rianlucas/tock_tock_nest/tree/golang-api/internal/entity"
	db "github.com/rianlucas/tock_tock_nest/tree/golang-api/internal/infra/db/sqlc"
)

type UserService struct {
	queries *db.Queries
}

func NewUserService(queries *db.Queries) *UserService {
	return &UserService{
		queries: queries,
	}
}

func (s *UserService) ListMany(ctx context.Context) ([]db.User, error) {
	users, err := s.queries.ListUsers(ctx)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (s *UserService) Create(ctx context.Context, user *entity.User) (db.User, error) {
	createUser := db.CreateUserParams{
		ID:       user.ID,
		Name:     user.Name,
		Email:    user.Email,
		LastName: user.LastName,
		Document: user.Document,
		Password: user.Password,
	}
	userCreated, err := s.queries.CreateUser(ctx, createUser)
	if err != nil {
		return db.User{}, err
	}
	return userCreated, nil
}

func (s *UserService) FindById(ctx context.Context, id string) (db.User, error) {
	userId, err := uuid.Parse(id)
	if err != nil {
		return db.User{}, err
	}
	user, err := s.queries.GetUser(ctx, userId)
	if err != nil {
		return db.User{}, err
	}
	return user, nil
}
