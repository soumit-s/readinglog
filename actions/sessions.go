package actions

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"readinglog.com/db"
	"readinglog.com/db/models"
	"readinglog.com/schemas"
)

// Starts a new user session and returns the session
// token to be placed in the cookie.
// It returns an error if it fails.
func StartSession(uid uint) (*models.Session, error) {
	session := models.Session{
		UserID: uid,
		Key:    "dgsdgH35nKMmN",
	}

	r := db.ReadingLog.Table("sessions").Create(&session)
	if r.Error != nil {
		return nil, r.Error
	}

	return &session, nil
}

// Return all open sessions for an user.
func GetSessions(uid uint) ([]models.Session, error) {
	sessions := make([]models.Session, 0)
	r := db.ReadingLog.Table("sessions").Where("user_id = ?", uid).Find(&sessions)
	if r.Error != nil {
		return nil, r.Error
	}

	return sessions, nil
}

// Check if a session exists for a given user.
func CheckIfSessionIsValid(s *models.Session) (*models.Session, bool) {
	session := models.Session{}
	r := db.ReadingLog.Table("sessions").Where(s, "user_id", "key").First(&session)
	if r.Error != nil && errors.Is(r.Error, gorm.ErrRecordNotFound) {
		return nil, false
	}
	return &session, true
}

func EndSession(session *models.Session) bool {
	r := db.ReadingLog.Clauses(clause.Locking{
		Strength: "UPDATE",
	}).Table("sessions").Delete(session)
	return r.Error != nil
}

// Returns the current session if present. The
// session is stored in the "session" cookie.
// It does not check whether the session is valid.
func GetCurrentSessionFromCtx(c *gin.Context) *models.Session {
	s, err := c.Cookie("session")
	if err == nil {
		session := models.Session{}

		if err = json.Unmarshal([]byte(s), &session); err == nil {
			return &session
		}
	}

	return nil
}

func HandleCurrentSessionFromCtx(c *gin.Context) *models.Session {
	session := GetCurrentSessionFromCtx(c)
	if session == nil {
		c.JSON(http.StatusOK, &schemas.ResponseSchema{
			Ok:   false,
			Code: schemas.StatusValidUserSessionNotPresent,
		})
	}
	return session
}
