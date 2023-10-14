package models

import "gorm.io/gorm"

type Log struct {
	gorm.Model

	Title   string // Title of the log
	Content string `gorm:"type:text"` // Contents of the log
	OwnerID uint   // The id of the user who created the reading log.

	Owner *User `gorm:"foreignKey:OwnerID;references:ID"`

	// The vocabulary of the log.
	Words []Word `gorm:"many2many:log_words_join_table;joinForeignKey:WordReferID;joinReferences:LogReferID;"`
}
