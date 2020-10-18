# Social Media App

- [Social Media App](#social-media-app)
  - [Microservices](#microservices)
    - [Posts Microservice](#posts-microservice)
    - [Comments Microservice](#comments-microservice)

## Microservices

### Posts Microservice

- Create Posts
- Fetch All Posts
- Routes

| Path     | Method | Body              | Goal               |
| -------- | ------ | ----------------- | ------------------ |
| `/posts` | POST   | `{title: String}` | Create a new Post  |
| `/posts` | GET    | `-`               | Retrieve All posts |


### Comments Microservice

- Create Comments
- Fetch All Comments
- Routes

| Path                  | Method | Body                | Goal                                               |
| --------------------- | ------ | ------------------- | -------------------------------------------------- |
| `/posts/:id/comments` | POST   | `{content: String}` | Create comment associated with a post ID           |
| `/posts/:id/comments` | GET    | `-`                 | Retrieve All comments associated with a comment ID |


