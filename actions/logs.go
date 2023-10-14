package actions

import (
	"fmt"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"readinglog.com/db"
	"readinglog.com/db/models"
	"readinglog.com/schemas"
)

func GetLogsInfo(ownerId uint, logs *[]schemas.LogInfoSchema) error {
	lmodels := []models.Log{}
	r := db.ReadingLog.Table("logs").Where("owner_id = ?", ownerId).Select("id", "title", "created_at").Find(&lmodels)
	if r.Error != nil {
		return r.Error
	}

	for _, m := range lmodels {
		*logs = append(*logs, schemas.LogInfoSchema{
			Id:        m.ID,
			Title:     m.Title,
			Words:     ConvertWordsToString(m.Words),
			CreatedAt: m.CreatedAt,
			Url:       fmt.Sprintf("/%v/log/%v", ownerId, m.ID),
		})
	}

	return nil
}

// Returns a string array containing the words that
// are part of the vocabulary of the log.
func ConvertWordsToString(words []models.Word) []string {
	result := make([]string, len(words))
	for i, word := range words {
		result[i] = word.Value
	}
	return result
}

func GetLog(logId uint, l *models.Log) error {
	return db.ReadingLog.Table("logs").Where("id = ?", logId).Preload("Words").Find(&l).Error
}

func GetWords(words []string, models *[]models.Word) error {
	return db.ReadingLog.Table("words").Where("value = ?", words).Find(models).Error
}

func UpdateLog(logId uint, l schemas.LogSchema) error {
	lag := models.Log{
		Title:   l.Title,
		Content: l.Content,
	}

	return db.ReadingLog.Transaction(func(tx *gorm.DB) error {
		words := make([]models.Word, len(l.Words))[:0]
		for _, w := range l.Words {
			word := models.Word{Value: w}
			if err := db.ReadingLog.Where("value = ?", w).FirstOrCreate(&word).Error; err != nil {
				return err
			}
			words = append(words, word)
		}

		err := db.ReadingLog.Clauses(
			clause.Locking{Strength: "UPDATE"},
		).Where("id = ?", logId).Select("title", "content").Updates(&lag).Error

		if err != nil {
			return err
		}

		return db.ReadingLog.Model(&models.Log{
			Model: gorm.Model{ID: logId},
		}).Association("Words").Replace(words)
	})
}

func wordsFromString(ws []string) []models.Word {
	words := make([]models.Word, len(ws))[:0]
	for _, w := range ws {
		words = append(words, models.Word{
			Value: w,
		})
	}
	return words
}
