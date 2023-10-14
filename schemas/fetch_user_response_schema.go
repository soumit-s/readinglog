package schemas

import (
	"fmt"

	"readinglog.com/db/models"
)

type FetchUserDataResponseSchema struct {
	ActiveUserPresent bool            `json:"active_user_present"` // If an user session is present
	IsAuthenticated   bool            `json:"authenticated"`       // If the user is authenticated
	Data              *UserDataSchema `json:"data,omitempty"`      // The actual user data.
}

type UserDataSchema struct {
	Name       string `json:"name"`    // Username
	Bio        string `json:"bio"`     // User Bio
	Email      string `json:"email"`   // User Email
	Picture    string `json:"picture"` // Profile Picture URL
	ProfileURL string `json:"url"`     // User Profile URL
}

// Populates the 'data' json object of the response
// with the data from the User obtained from the database.
func (s *FetchUserDataResponseSchema) PopulateUser(user *models.User) {
	if s.Data == nil {
		s.Data = &UserDataSchema{}
	}

	s.Data.Name = user.Name
	s.Data.Bio = user.Bio
	s.Data.Email = user.Email
	s.Data.Picture = ""
	s.Data.ProfileURL = fmt.Sprintf("/%v", user.ID)
}
