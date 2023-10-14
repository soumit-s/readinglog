package gateway

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
	"readinglog.com/actions"
	"readinglog.com/db"
	"readinglog.com/schemas"
)

func HandleEditUserInfo(c *gin.Context) {
	sessions := actions.HandleCurrentSessionFromCtx(c)
	if sessions == nil {
		return
	}

	body := schemas.EditUserInfoSchema{}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, &schemas.ResponseSchema{Ok: false, Code: schemas.StatusInvalidSchema})
		return
	}

	r := db.ReadingLog.Clauses(clause.Locking{Strength: "UPDATE"}).Table("users").Where("id = ?", sessions.UserID).Select("name", "bio").Updates(
		map[string]interface{}{
			"name": body.UserName,
			"bio":  body.Bio,
		})

	if r.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"ok": false})
		return
	}

	c.JSON(http.StatusOK, &schemas.ResponseSchema{Ok: true, Code: schemas.StatusOK})
}
