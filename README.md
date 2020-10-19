# Social Media App

- [Social Media App](#social-media-app)
  - [Running locally](#running-locally)
  - [Microservices](#microservices)
    - [Posts Microservice](#posts-microservice)
    - [Comments Microservice](#comments-microservice)
  - [Event Bus](#event-bus)
    - [Use case](#use-case)
    - [Query service](#query-service)
    - [Event bus in this application](#event-bus-in-this-application)

## Running locally
1. Make sure you are in root of the project
2. Execute `npm run dev`

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

## Event Bus

- Used to reduce number of requests
- Substitute to Intermicroservice communication (Intermicroservice communication ust be avaoided anyway!)
- Recieves events, publishes to listeners
- Many subtle feature tht makes communication easier or harder
- Implementations includes RabbitMQ, Kafka, NATS etc.
- Can be String/JSON/Integer etc. (Not proper standard)

### Use case 

- Suppose we have a comments and posts microservice, we have to fetch comments for each posts. We will either send 100 requests for 100 posts from client or perform the same thing by making requests from one microservice to another. This can be evoided using event bus
  1. Send request to create post (post-service)
  2. Post saved to database
  3. Creation of Event bus
  4. Event bus adds data in table ofa new query-service
  5. Send request to create comment
  6. Comment saeed to database (coment-service)
  7. Creation of event bus
  8. Event bus adds data in table of the query servce for associated post
  9. All fetch requests will be made to query service


### Query service

- Microservice consisting of event bus
- Pros
  - Extremely fast
  - No dependencies with other services
- Cons
  - Data duplication
  - Difficult ot understand

### Event bus in this application

1. Post, comment and queue microserice will have an endpoint `POST /events`
2. To emit an event, every microservice will send a POST request to event bus
2. When Event bus receieves an event from microservice, it will send a series of POST requests to each microservice at endpoint of step 1
