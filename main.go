package main

import (
	"log"

	"github.com/joho/godotenv"
	"readinglog.com/gateway"
)

func init() {
	// Load .env configuration file.
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Failed to load configuration file:\n%v", err)
	}

}

func main() {
	if err := gateway.App.Run(":7000"); err != nil {
		panic(err)
	}
}
