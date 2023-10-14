package models

import "gorm.io/gorm"

type Word struct {
	gorm.Model

	Value string `gorm:"unique"`
}
