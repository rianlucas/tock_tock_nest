package response

import (
	"encoding/json"
	"net/http"
)

// Estrutura padrão para todas as respostas
type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *APIError   `json:"error,omitempty"`
	Meta    *Metadata   `json:"meta,omitempty"`
}

type APIError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Details string `json:"details,omitempty"`
}

type Metadata struct {
	Page       int `json:"page,omitempty"`
	PerPage    int `json:"per_page,omitempty"`
	TotalPages int `json:"total_pages,omitempty"`
	TotalItems int `json:"total_items,omitempty"`
}

// Funções auxiliares para criar respostas
func Success(data interface{}, meta *Metadata) APIResponse {
	return APIResponse{
		Success: true,
		Data:    data,
		Meta:    meta,
	}
}

func Error(code string, message string, details string) APIResponse {
	return APIResponse{
		Success: false,
		Error: &APIError{
			Code:    code,
			Message: message,
			Details: details,
		},
	}
}

func RespondWithJSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}
