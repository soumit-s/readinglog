package models

import "gorm.io/gorm"

type User struct {
	gorm.Model

	Name  string
	Bio   string
	Email string

	Password string

	// Logs owned by the user.
	Logs []Log `gorm:"foreignKey:OwnerID;"`
}
