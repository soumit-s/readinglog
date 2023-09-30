package actions

import (
	"readinglog.com/db"
	"readinglog.com/db/models"
)

func GetUserByEmail(email string, user *models.User) bool {
	t := db.ReadingLog.Table("users").Where("email = ?", email).First(&user)
	return t.Error == nil
}
