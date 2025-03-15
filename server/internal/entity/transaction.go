package entity

import (
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/pkg/entity"
	"time"
)

type Transaction struct {
	ID        string    `json:"id"`
	Type      string    `json:"type"`
	Amount    float64   `json:"amount"`
	Quantity  int64     `json:"quantity"`
	Wallet    Wallet    `json:"wallet"`
	Asset     Asset     `json:"asset"`
	CreatedAt time.Time `json:"created_at"`
}

func NewTransaction(typ string, amount float64, quantity int64, wallet Wallet, asset Asset) *Transaction {
	return &Transaction{
		ID:        entity.NewId().String(),
		Type:      typ,
		Amount:    amount,
		Quantity:  quantity,
		Wallet:    wallet,
		Asset:     asset,
		CreatedAt: time.Now(),
	}
}
