package gateway

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// This is a server side debug method and must
// be removed during prod.
// Making a request to /show_cookies triggers this handler.
// It logs all the relevant cookies of the site into
// the server side console.
func HandleShowCookies(c *gin.Context) {
	if session, err := c.Cookie("session"); err != nil {
		log.Printf("error: %v", err)
		// Try setting the cookie
		c.SetCookie("session", "hola", 3600, "/", "localhost", false, true)
	} else {
		log.Printf("session: %v", session)
	}

	c.String(http.StatusOK, "Ok")
}
