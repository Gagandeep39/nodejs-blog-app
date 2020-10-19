# Social Media App

- [Social Media App](#social-media-app)
  - [Running locally](#running-locally)
    - [Services and default post](#services-and-default-post)
  - [Microservices](#microservices)
    - [Posts Microservice](#posts-microservice)
    - [Comments Microservice](#comments-microservice)
  - [Event Bus](#event-bus)
    - [Use case](#use-case)
  - [Query service](#query-service)
  - [Event bus in this application](#event-bus-in-this-application)
  - [Moderation Service](#moderation-service)
  - [Handling Missing event](#handling-missing-event)

## Running locally
1. Make sure you are in root of the project
2. Execute `npm run dev`

### Services and default post

| Service              | Port | Tasks                        |
| -------------------- | ---- | ---------------------------- |
| `comment-service`    | 5000 | Handle Comments              |
| `posts-service`      | 4000 | Handle Posts                 |
| `query-service`      | 8000 | Handles data presentation    |
| `moderation-service` | 9000 | Moderate comments            |
| `event-bus`          | 7000 | Publishes and handles events |
| `react-client `      | 3000 | Client App                   |

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


## Query service

- Microservice consisting of event bus
- Pros
  - Extremely fast
  - No dependencies with other services
- Cons
  - Data duplication
  - Difficult ot understand

## Event bus in this application

1. Post, comment and queue microserice will have an endpoint `POST /events`
2. To emit an event, every microservice will send a POST request to event bus
2. When Event bus receieves an event from microservice, it will send a series of POST requests to each microservice at endpoint of step 1

## Moderation Service

- Used to moderate the comment
- Rejects the comment if it contains `orange as substring`
- Flow
  1. Comment posted by client
  2. Comment recieved at comment-service
  3. Event sent to event-bus
  4. Event published by event bus
  5. Event recieved by moderation service
  6. Comment moderated by service
  7. Event `CommentModerated` published
  8. Event recieved by comment-service, when will then be updated in database (Not query service because query-service is only for presenting data. All operation related to data manipulation must be managed by other services)
  9. Event will be published which will then be handled by query service

## Handling Missing event

- Usecase - In this application, if moderation service goes down for sometime, then all comments created in that particular time will be in pending state and will never get moderated even if the service comes online later on
- Possible solutions
  1. Make a request to comments servie and ecth all comments - Not feasible as the data will be too large in real orld scenario
  2. Give direct access to database - Unnecessary repetiotion of code(Same code of comment service will be writen here also )
  3. Event bus stores all recieved events in data store and make the query service fetch data from event data store - Feasible approach

- Steps
1. Create an array in event bus
2. Push all events in events array
3. Create an endpoint tha fetches all events that are stored in this bus
4. Access the endpoint from query service and handle events
  
