package gateway

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"readinglog.com/actions"
	"readinglog.com/db"
	"readinglog.com/db/models"
	"readinglog.com/schemas"
)

func HandleFetchCurrentUser(c *gin.Context) {
	statusCode := http.StatusOK
	response := schemas.FetchUserDataResponseSchema{}

	// Send the response object as body.
	defer c.JSON(statusCode, &response)

	// If there are no active sessions
	sc, err := c.Cookie("session")
	if err != nil {
		return
	} else {
		response.ActiveUserPresent = true
	}

	// Unmarshal the json object.
	s := models.Session{}
	json.Unmarshal([]byte(sc), &s)

	// Check if the session is a valid session.
	session, ok := actions.CheckIfSessionIsValid(&s)
	if !ok {
		return
	} else {
		response.IsAuthenticated = true
	}

	// Fetch the user data from the database.
	user := &models.User{}
	r := db.ReadingLog.Table("users").Where("id = ?", session.UserID).First(&user)
	if r.Error != nil {
		if errors.Is(r.Error, gorm.ErrRecordNotFound) {
			// User has been deleted but a session for the given user exists.
			// It is a server sided error.
			// For now send a Internal Server Error Code.
			// TODO!
			statusCode = http.StatusInternalServerError
		} else {
			// Internal error.
			statusCode = http.StatusInternalServerError
		}
	}

	// Populate the actual user data.
	response.PopulateUser(user)
}
