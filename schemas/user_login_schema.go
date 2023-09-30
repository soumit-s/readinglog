package schemas

type FieldErrorSchema struct {
	FieldName string `json:"field_name"` // The field name which is invalid.
	ErrorCode int    `json:"error_code"` // The error code.
	Msg       string `json:"message"`    // The error message.

}

type UserLoginSchema struct {
	Email    string `json:"email"`    // The email of the user.
	Password string `json:"password"` // The password
}

type UserLoginResponseSchema struct {
	Ok       bool               `json:"ok"`                 // Whether the request was Ok
	Code     int                `json:"code"`               // The status code of the operation
	Redirect string             `json:"redirect,omitempty"` // The Url to redirect to.
	Errors   []FieldErrorSchema `json:"errors"`             // A list of errors if any.
}
