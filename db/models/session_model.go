package models

import "gorm.io/gorm"

type Session struct {
	gorm.Model

	UserID uint   `json:"uid"`
	Key    string `json:"key"`
}
