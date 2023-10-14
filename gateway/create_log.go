package gateway

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"readinglog.com/actions"
	"readinglog.com/db"
	"readinglog.com/db/models"
	"readinglog.com/schemas"
)

func HandleCreateLog(c *gin.Context) {
	session := actions.HandleCurrentSessionFromCtx(c)
	if session == nil {
		return
	}

	createLog := schemas.CreateLogSchema{}
	err := c.BindJSON(&createLog)
	if err != nil {
		c.JSON(http.StatusBadRequest, schemas.ResponseSchema{
			Ok:   false,
			Code: schemas.StatusInvalidSchema,
		})
		return
	}

	// Create the log.
	log := models.Log{
		Title:   createLog.Title,
		Content: createLog.Content,
		Words:   nil,

		OwnerID: session.UserID,
	}

	ok := db.CreateLog(&log)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"ok": false})
		return
	}

	c.JSON(http.StatusOK, &schemas.CreateLogResponseSchema{
		ResponseSchema: schemas.ResponseSchema{
			Ok:   false,
			Code: schemas.StatusOK,
		},
		LogID: log.ID,
	})
}
