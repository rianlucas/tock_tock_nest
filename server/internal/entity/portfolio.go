package entity

import (
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/pkg/entity"
	"time"
)

type Portfolio struct {
	ID            string    `json:"id"`
	AveragePrice  float64   `json:"averagePrice"`
	AssetCount    int64     `json:"assetCount"`
	TotalInvested float64   `json:"totalInvested"`
	GrossBalance  float64   `json:"grossBalance"`
	Rentability   float64   `json:"rentability"`
	Wallet        Wallet    `json:"wallet"`
	Asset         Asset     `json:"asset"`
	CreatedAt     time.Time `json:"createdAt"`
}

func NewPortfolio(averagePrice, totalInvested, grossBalance, rentability float64, wallet Wallet, asset Asset) *Portfolio {
	return &Portfolio{
		ID:            entity.NewId().String(),
		AveragePrice:  averagePrice,
		AssetCount:    0,
		TotalInvested: totalInvested,
		GrossBalance:  grossBalance,
		Rentability:   rentability,
		Wallet:        wallet,
		Asset:         asset,
		CreatedAt:     time.Now(),
	}
}
