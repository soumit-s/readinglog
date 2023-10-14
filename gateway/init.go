package gateway

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"readinglog.com/config"
)

var (
	App *gin.Engine
)

func init() {
	App = gin.Default()

	SetupCors(App)
	SetupSessions(App)

	App.POST(CreateUserPath, HandleCreateUser)
	App.POST(SignInPath, HandleLogin)
	App.GET("/show_cookies", HandleShowCookies)
	App.GET(FetchUserDataPath, HandleFetchCurrentUser)
	App.POST(CreateLogPath, HandleCreateLog)
	App.POST(EditUserInfoPath, HandleEditUserInfo)
	App.GET(FetchLogsPath, HandleFetchLogs)
	App.DELETE(DeleteLogPath, HandleDeleteLog)
	App.GET(FetchLogPath, HandleFetchLog)
}

// Sets-Up the CORS middleware.
func SetupCors(app *gin.Engine) {
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowCredentials = true

	app.Use(cors.New(config))
}

// Sets up the session manager.
func SetupSessions(app *gin.Engine) {
	store := cookie.NewStore([]byte(config.Get(config.SessionSecretKey)))
	s := sessions.Sessions("session", store)
	app.Use(s)
}
