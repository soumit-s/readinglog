package schemas

type EditUserInfoSchema struct {
	UserName string `json:"name"`
	Bio      string `json:"bio"`
}
