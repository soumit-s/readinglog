package gateway

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"readinglog.com/actions"
	"readinglog.com/db/models"
	"readinglog.com/schemas"
)

func HandleFetchLog(c *gin.Context) {
	session := actions.GetCurrentSessionFromCtx(c)
	if session == nil {
		c.JSON(http.StatusForbidden, schemas.ResponseSchema{Ok: false, Code: schemas.StatusValidUserSessionNotPresent})
		return
	}

	id, err := strconv.ParseUint(c.Params.ByName("lid"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadGateway, schemas.ResponseSchema{Ok: false, Code: schemas.StatusLogNotFound})
		return
	}

	log := models.Log{}
	if err = actions.GetLog(uint(id), &log); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusBadGateway, schemas.ResponseSchema{Ok: false, Code: schemas.StatusLogNotFound})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false})
		}
	}

	if log.OwnerID != session.UserID {
		c.JSON(http.StatusForbidden, gin.H{"ok": false})
		return
	}

	c.JSON(http.StatusOK, schemas.FetchLogResponseSchema{
		ResponseSchema: schemas.ResponseSchema{
			Ok:   true,
			Code: schemas.StatusOK,
		},
		Log: schemas.LogSchema{
			Id:      uint(id),
			Title:   log.Title,
			Content: log.Content,
			Words:   actions.ConvertWordsToString(log.Words),
		},
	})
}
