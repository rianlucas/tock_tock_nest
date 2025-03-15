package main

import (
	"database/sql"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/lib/pq"
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/internal/configs"
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/internal/handler"
	db "github.com/rianlucas/tock_tock_nest/tree/golang-api/internal/infra/db/sqlc"
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/internal/service"
	"log"
	"net/http"
)

func main() {
	config, err := configs.LoadConfig(".")
	if err != nil {
		log.Fatalf("Erro ao carregar configurações: %v", err)
	}
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.DBHost, config.DBPort, config.DBUser, config.DBPassword, config.DBName)
	database, err := sql.Open(config.DBDriver, connStr)
	if err != nil {
		log.Fatalf("Erro ao conectar ao banco de dados: %v", err)
	}

	defer database.Close()

	queries := db.New(database)
	userService := service.NewUserService(queries)
	userHandler := handler.NewUserHandler(*userService)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)

	r.Get("/api/users", userHandler.ListMany)
	r.Get("/api/users/{id}", userHandler.FindById)
	r.Post("/api/users", userHandler.Create)

	err = http.ListenAndServe(":8080", r)
	if err != nil {
		return
	}
}
