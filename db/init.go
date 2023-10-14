package db

import (
	"errors"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"readinglog.com/db/models"
)

var (
	ReadingLog *gorm.DB
)

const (
	TableUsersName = "users"
)

const (
	URI = "host=localhost user=soumit password=soumit dbname=readinglog port=5432 sslmode=disable TimeZone=Asia/Shanghai"
)

func init() {
	db, err := gorm.Open(postgres.Open(URI), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	ReadingLog = db

	// Migrate the schemas
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Session{})
	db.AutoMigrate(&models.Log{})
	db.AutoMigrate(&models.Word{})
}

func DoesUserExistByEmail(email string) bool {
	user := &models.User{}
	r := ReadingLog.Table(TableUsersName).Select("email").Where("email = ?", email).First(&user)
	return !errors.Is(r.Error, gorm.ErrRecordNotFound)
}

func CreateUser(user *models.User) bool {
	r := ReadingLog.Create(&user)
	if r.Error != nil {
		return false
	}

	return true
}

func CreateLog(log *models.Log) bool {
	return ReadingLog.Clauses(clause.Locking{Strength: "UPDATE"}).Table("logs").Create(log).Error == nil
}

func GetLog(id uint, log *models.Log) bool {
	return ReadingLog.Table("logs").Where("owner_id = ?", id).Find(&log).Error == nil
}
