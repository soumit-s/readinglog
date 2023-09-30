package models

import "gorm.io/gorm"

type Log struct {
	gorm.Model

	Title       string // Title of the log
	Description string // Contents of the log

	Owner uint // The person who created the reading log.
}
