package schemas

// Contains fields common to all responses.
type ResponseSchema struct {
	Ok   bool `json:"ok"`   // Whether the request was a success.
	Code int  `json:"code"` // The status code of the request.
}
