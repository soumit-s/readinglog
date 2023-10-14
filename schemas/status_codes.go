package schemas

const (
	StatusOK                         = iota
	StatusUserNotFound               = iota
	StatusLoginError                 = iota
	StatusUserAlreadyPresent         = iota
	StatusIncorrectPassword          = iota
	StatusValidUserSessionNotPresent = iota
	StatusInvalidSchema              = iota
	StatusLogNotFound                = iota
)
