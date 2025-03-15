package handler

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/internal/entity"
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/internal/service"
	"github.com/rianlucas/tock_tock_nest/tree/golang-api/pkg/response"
)

type UserHandler struct {
	UserService service.UserService
}

func NewUserHandler(userService service.UserService) *UserHandler {
	return &UserHandler{
		UserService: userService,
	}
}

func (h *UserHandler) ListMany(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	users, err := h.UserService.ListMany(ctx)
	if err != nil {
		response.RespondWithJSON(w, http.StatusInternalServerError, response.Error("INTERNAL_ERROR", "Failed to list users", err.Error()))
		return
	}

	res := response.Success(users, nil)
	response.RespondWithJSON(w, http.StatusOK, res)
}

func (h *UserHandler) Create(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	// Parse the request body to get the user data
	var user *entity.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		response.RespondWithJSON(w, http.StatusBadRequest, response.Error("INVALID_REQUEST", "Invalid request body", err.Error()))
		return
	}
	user = entity.NewUser(user.Email, user.Name, user.LastName, user.Document, user.Password)

	// Call the service to create the user
	userCreated, err := h.UserService.Create(ctx, user)
	if err != nil {
		response.RespondWithJSON(w, http.StatusInternalServerError, response.Error("INTERNAL_ERROR", "Failed to create user", err.Error()))
		return
	}
	// Respond with the created user
	res := response.Success(userCreated, nil)
	response.RespondWithJSON(w, http.StatusCreated, res)
}

func (h *UserHandler) FindById (w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	userId := chi.URLParam(r, "id")
	
	user, err := h.UserService.FindById(ctx, userId)
	if err != nil {
		response.RespondWithJSON(w, http.StatusInternalServerError, response.Error("Not Found", "User Not found", err.Error()))
		return
	}

	response.RespondWithJSON(w, http.StatusOK, user)
}
