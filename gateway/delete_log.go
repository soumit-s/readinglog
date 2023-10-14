package gateway

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
	"readinglog.com/actions"
	"readinglog.com/db"
	"readinglog.com/db/models"
	"readinglog.com/schemas"
)

func HandleDeleteLog(c *gin.Context) {
	// Check current user.
	session := actions.GetCurrentSessionFromCtx(c)
	if session == nil {
		c.JSON(http.StatusForbidden, schemas.ResponseSchema{Ok: false, Code: schemas.StatusValidUserSessionNotPresent})
		return
	}

	id, err := strconv.Atoi(c.Query("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, schemas.ResponseSchema{Ok: false, Code: schemas.StatusLogNotFound})
		return
	}

	// Delete the log.
	r := db.ReadingLog.Clauses(clause.Locking{Strength: "UPDATE"}).Table("logs").Delete(&models.Log{}, id)
	if r.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"ok": false})
		return
	}

	c.JSON(http.StatusOK, schemas.ResponseSchema{Ok: false, Code: schemas.StatusOK})
}
