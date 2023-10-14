package schemas

import (
	"time"
)

type FetchLogsSchema struct {
	ResponseSchema

	Logs []LogInfoSchema `json:"logs"`
}

type LogInfoSchema struct {
	Id        uint      `json:"id"`
	Title     string    `json:"title"`
	Words     []string  `json:"words"`
	CreatedAt time.Time `json:"created_at"`
	Url       string    `json:"url"`
}
