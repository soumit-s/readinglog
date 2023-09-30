package config

import "os"

const (
	MongoUri         = "MONGO_URI"
	SessionSecretKey = "SESSION_SECRET_KEY"
)

func Get(name string) string {
	return os.Getenv(name)
}
