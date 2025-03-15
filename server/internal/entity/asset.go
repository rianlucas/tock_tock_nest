package entity

import (
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/pkg/entity"
	"time"
)

type Asset struct {
	ID          string        `json:"id"`
	Name        string        `json:"name"`
	Ticket      string        `json:"ticket"`
	Price       string        `json:"price"`
	Wallet      Wallet        `json:"wallet"`
	Transaction []Transaction `json:"transaction"`
	Portfolio   []Portfolio   `json:"portfolio"`
	CreatedAt   time.Time     `json:"createdAt"`
}

func NewAsset(name, ticket, price string, wallet Wallet) *Asset {
	return &Asset{
		ID:          entity.NewId().String(),
		Name:        name,
		Ticket:      ticket,
		Price:       price,
		Wallet:      wallet,
		Transaction: []Transaction{},
		Portfolio:   []Portfolio{},
		CreatedAt:   time.Now(),
	}
}
