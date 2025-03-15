package entity

import (
	"time"

	"github.com/google/uuid"
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/pkg/entity"
)

type User struct {
	ID        uuid.UUID    `json:"id"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	LastName  string    `json:"last_name"`
	Document  string    `json:"document"`
	Password  string    `json:"password"`
	Wallet    []Wallet  `json:"wallet"`
	CreatedAt time.Time `json:"createdAt"`
}

func NewUser(email, name, lastName, document, password string) *User {
	return &User{
		ID:        entity.NewId(),
		Email:     email,
		Name:      name,
		LastName:  lastName,
		Document:  document,
		Password:  password,
		Wallet:    []Wallet{},
		CreatedAt: time.Now(),
	}
}
