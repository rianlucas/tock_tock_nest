package entity

import (
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/pkg/entity"
	"time"
)

type Wallet struct {
	ID          string        `json:"id"`
	Name        string        `json:"name"`
	User        User          `json:"user"`
	Asset       []Asset       `json:"asset"`
	Transaction []Transaction `json:"transaction"`
	Portfolio   []Portfolio   `json:"portfolio"`
	CreatedAt   time.Time     `json:"createdAt"`
}

func NewWallet(name string, user User) *Wallet {
	return &Wallet{
		ID:          entity.NewId().String(),
		Name:        name,
		User:        user,
		Asset:       []Asset{},
		Transaction: []Transaction{},
		Portfolio:   []Portfolio{},
		CreatedAt:   time.Now(),
	}
}
