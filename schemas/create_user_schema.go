package schemas

type CreateUserSchema struct {
	Name     string `json:"username" validate:"required"`
	Email    string `json:"email" validtate:"required"`
	Password string `json:"password" validate:"required"`
}
