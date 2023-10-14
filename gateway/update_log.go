package gateway

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"readinglog.com/actions"
	"readinglog.com/db/models"
	"readinglog.com/schemas"
)

func HandleUpdateLog(c *gin.Context) {
	id, err := strconv.ParseUint(c.Query("id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusNotFound, schemas.ResponseSchema{Ok: false, Code: schemas.StatusLogNotFound})
		return
	}

	session := actions.GetCurrentSessionFromCtx(c)
	if session == nil {
		c.JSON(http.StatusForbidden, schemas.ResponseSchema{Ok: false, Code: schemas.StatusValidUserSessionNotPresent})
		return
	}

	// Check if the l belongs to the given user.
	l := models.Log{}
	err = actions.GetLog(uint(id), &l)
	if err != nil {
		c.JSON(http.StatusNotFound, schemas.ResponseSchema{Ok: false, Code: schemas.StatusLogNotFound})
		return
	}

	if l.OwnerID != session.UserID {
		c.JSON(http.StatusForbidden, schemas.ResponseSchema{Ok: false, Code: schemas.StatusLogNotFound})
		return
	}

	req := schemas.UpdateLogSchema{}
	if err = c.BindJSON(&req); err != nil {
		log.Printf("%v", err)
		c.JSON(http.StatusBadRequest, schemas.ResponseSchema{Ok: false, Code: schemas.StatusInvalidSchema})
		return
	}

	// Update the log.
	err = actions.UpdateLog(uint(id), req)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, schemas.ResponseSchema{Ok: false, Code: schemas.StatusLogNotFound})
		return
	}

	c.JSON(http.StatusOK, schemas.ResponseSchema{Ok: true, Code: schemas.StatusOK})
}
