package gateway

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
	"readinglog.com/actions"
	"readinglog.com/db"
	"readinglog.com/db/models"
	"readinglog.com/schemas"
)

func HandleLogin(c *gin.Context) {
	// Check if a username with the given email and password
	// exists or not
	b := schemas.UserLoginSchema{}
	if err := c.BindJSON(&b); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ok": false})
		return
	}

	user := models.User{}
	if ok := actions.GetUserByEmail(b.Email, &user); !ok {
		// User not found.
		c.JSON(http.StatusOK, schemas.UserLoginResponseSchema{
			Ok:   false,
			Code: schemas.StatusUserNotFound,
			Errors: []schemas.FieldErrorSchema{
				{
					FieldName: "email",
					ErrorCode: schemas.StatusUserNotFound,
					Msg:       "No user exists with the given email",
				},
			},
		})
		return
	}

	// Check if the password matches
	if user.Password != b.Password {
		c.JSON(http.StatusOK, schemas.UserLoginResponseSchema{
			Ok:   false,
			Code: schemas.StatusLoginError,
			Errors: []schemas.FieldErrorSchema{
				{FieldName: "password", ErrorCode: schemas.StatusIncorrectPassword, Msg: "Password does not match"},
			},
		})
		return
	}

	// Check if a valid session already exists. In that case do nothing.
	// If the session does not belong to the current user then end the session.
	// And delete it.
	if v, err := c.Cookie("session"); err == nil {
		session := models.Session{}
		if err = json.Unmarshal([]byte(v), &session); err == nil {
			if _, ok := actions.CheckIfSessionIsValid(&session); ok {

				// Check if the session belongs to the same user.
				if session.UserID == user.ID {
					c.JSON(http.StatusOK, schemas.UserLoginResponseSchema{
						Ok:       false,
						Code:     schemas.StatusUserAlreadyPresent,
						Redirect: fmt.Sprintf("/%d", user.ID),
					})
					return
				}

				// Delete the existing session if it exists in the database.
				db.ReadingLog.Clauses(clause.Locking{Strength: "UPDATE"}).Table("sessions").Delete(session)
				// Delete the session cookie.
				c.SetCookie("session", "", -1, "/", "localhost", false, true)
			}
		}
	}

	// Start a new session for the user.
	session, err := actions.StartSession(user.ID)
	if err != nil {
		c.JSON(http.StatusOK, schemas.UserLoginResponseSchema{
			Ok:   false,
			Code: schemas.StatusLoginError,
		})
		return
	}

	// Set the session cookie if the session creation was successfull
	if sc, err := json.Marshal(session); err == nil {
		c.SetCookie("session", string(sc), 3600*24, "/", "localhost", false, true)
		c.JSON(http.StatusOK, &schemas.UserLoginResponseSchema{
			Ok:       true,
			Code:     schemas.StatusOK,
			Redirect: fmt.Sprintf("/%d", user.ID),
		})

		return
	}

	c.JSON(http.StatusInternalServerError, &schemas.UserLoginResponseSchema{
		Ok:   false,
		Code: schemas.StatusLoginError,
	})
}
