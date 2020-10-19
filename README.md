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
  - [Deployment](#deployment)
  - [Kubernetes Flow](#kubernetes-flow)
  - [Kubernetes Keywords](#kubernetes-keywords)
  - [Kubernetes Config Files](#kubernetes-config-files)
  - [Useful K8s commands](#useful-k8s-commands)
  - [Customising Shell](#customising-shell)
  - [Keubernetes use cases](#keubernetes-use-cases)
    - [Method 1](#method-1)
    - [Method 2 (Preferred)](#method-2-preferred)
  - [Services](#services)
    - [Ports](#ports)
  - [Interservice Communication](#interservice-communication)
  - [NOTE](#note)

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

## Deployment

- Various COnsiderations are required to be made while deploying application
  - Scaling, Inter ervice communications, dynamic ports and IPs
- Using docker
  - We don't need to assume the hardware the application will run on, instead will specify the hard manually i nocker
  - No need to understand how application runs eg. `npm start`

## Kubernetes Flow

1. Create Docker image for microservice
2. Create a confi file to specify how/what services to deploy

## Kubernetes Keywords

- Cluster - Collection of Nodes and a master to manage it
- Node - VM to run containers
- Pod - Smallest unit of k8s that encapsultes a docker container
- Service - Used to access pods
- Deployment - Monitor a set of pod, rest on crash etc.

## Kubernetes Config Files

- Tell K8s about varus services, deployments etc.
- Written in YAML
- Always stored with source code
- K8s objects can be created in CLI (Must be avoided)

## Useful K8s commands  

- `kubectl apply -f .` Run all fines in present directory
- `kubectl apply -f <filename.yml>` Run a specific file
- `kubectl get all` Displays all K8s entities
- `kubectl get pods` Displays a list of Pods
- `kubectl logs <pod-name>` View execution logs
- `kubectl delete pod <pod-name>` Delete a pod
- `kubectl describe pod <pod-name>` Description of Pod
- `kubectl exec -it <pod-name> <command>`
  - Similar to `docker exec -it <container-name> bash`
  - Access pod through commandline

## Customising Shell

- Use `zsh` to provide support for better commnds
  - `kubectl` can be replaced with `k`
  - Other such alias can be created
- Steps to create alias
  1. code ~/.zshrc
  2. Create alias
      - `alias dps="docker ps"`
      - `alias kubectl="k"`
      - `alias code="code-insiders"`

## Keubernetes use cases

### Method 1

- Not ued because we hard code the version evrywhere (Requires changes again and again)
- Steps
1. Make code changes
2. Rebuild image with new version
3. In deployment file update version
4. Run `kubectl apply -f <file-name>`

### Method 2 (Preferred)

1. Deployment must use latest tage
2. Update code
3. Build and publish image to dockerhub
4. Run `kubectl rollout restart deployment <depl-name>` (If doesnt work then add imagePullPolicy: Always or just WAIT for 5min)

## Services

- `ClusterIP` Proves a name to access a pod. Pod accessible inside cluser
- `NodePort` Used for dev only, Exposes pod to real world
- `Load Balancer` Makes pod accessbile from outide container
- `External name` Redirects in-cluster request to outside (probably never used)

### Ports

```yml
- port: 4000 # Node service port
  name: posts-port
  protocol: TCP
  targetPort: 4000 # Port of pod we want to expose
```
- Flow 
  - nodePort (Accessed via browser) -> port(Port assigned to node-service) -> targetPort (Application)
  - Node pode reqests i redirected to service where service redirects to application

## Interservice Communication

- When a request is sent, an event is created and sent to event bus
- In kubernetes we will do this using ClusterIP
  1. A request will be made by posts-service to clisterIP service of event-bus
  2. Event bus will recieve the request from ClusterIP service
  3. Event bus will publish an event to all cluster IP services which will then be forwarded to associated microservices
  
## NOTE
- `docker run -it [img-id] sh` - Overides default command and **starts container**
- `docker exec -it [img-id] sh` - Allows accessing a **running container**

