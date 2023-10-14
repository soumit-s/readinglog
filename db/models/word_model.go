package models

import "gorm.io/gorm"

type Word struct {
	gorm.Model

	Value string
	Logs  []Log `gorm:"many2many:log_words_join_table;"`
}
