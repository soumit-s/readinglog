package gateway

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"readinglog.com/actions"
	"readinglog.com/db"
	"readinglog.com/db/models"
	"readinglog.com/schemas"
)

func HandleCreateUser(c *gin.Context) {
	var form schemas.CreateUserSchema
	if err := c.BindJSON(&form); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"ok": false,
		})

		return
	}

	// Check if an user already exists with the email address.
	if db.DoesUserExistByEmail(form.Email) {
		c.JSON(http.StatusAccepted, gin.H{
			"ok": false,
			"fields": gin.H{
				"email": gin.H{
					"type": "error",
					"msg":  "Email already taken",
				},
			},
		})

		return
	}

	user := models.User{
		Name:     form.Name,
		Email:    form.Email,
		Password: form.Password,
	}

	// Try creating the user.
	if !db.CreateUser(&user) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"ok": false,
		})

		return
	}

	log.Printf("%v", form)

	// Start a new session
	session, err := actions.StartSession(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"ok": false,
		})

		return
	}

	encodedSessionCookie, _ := json.Marshal(&session)
	sessionCookie := string(encodedSessionCookie)

	// Set the session cookie.
	c.SetCookie("session", sessionCookie, 3600, "/", "localhost", false, true)

	c.JSON(http.StatusAccepted, gin.H{
		"ok":       true,
		"uid":      user.ID,
		"redirect": fmt.Sprintf("%d/dashboard", user.ID),
	})
}
