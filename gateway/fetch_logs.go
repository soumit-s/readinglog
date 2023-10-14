package gateway

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"readinglog.com/actions"
	"readinglog.com/schemas"
)

func HandleFetchLogs(c *gin.Context) {
	session := actions.GetCurrentSessionFromCtx(c)
	if session == nil {
		return
	}

	logs := []schemas.LogInfoSchema{}
	err := actions.GetLogsInfo(session.UserID, &logs)
	if err != nil {
		c.JSON(http.StatusInternalServerError, schemas.ResponseSchema{Ok: false})
		return
	}

	c.JSON(http.StatusOK, schemas.FetchLogsSchema{
		ResponseSchema: schemas.ResponseSchema{Ok: true, Code: schemas.StatusOK},
		Logs:           logs,
	})
}
