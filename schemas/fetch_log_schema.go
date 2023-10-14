package schemas

type LogSchema struct {
	Id      uint     `json:"id"`
	Title   string   `json:"title"`
	Content string   `json:"content"`
	Words   []string `json:"words"`
}

type FetchLogResponseSchema struct {
	ResponseSchema
	Log LogSchema `json:"data"`
}
