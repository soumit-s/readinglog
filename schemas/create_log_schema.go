package schemas

type CreateLogSchema struct {
	Title   string   `json:"title" binding:"required"` // Log Title
	Content string   `json:"content"`                  // Log Content
	Words   []string `json:"words" binding:"required"` // Log vocabulary
}

type CreateLogResponseSchema struct {
	ResponseSchema

	LogID uint `json:"log_id"` // The ID of the log created.
}
