package actions

import (
	"errors"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"readinglog.com/db"
	"readinglog.com/db/models"
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
