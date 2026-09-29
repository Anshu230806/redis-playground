# Redis Playground

A small **Node.js project for learning and experimenting with Redis** using `ioredis`.

This project demonstrates how Redis can be used as an in-memory data store and as a **cache layer** in front of an API.

## What This Project Demonstrates

* Connecting a Node.js application to Redis
* Using Redis `SET` and `GET` operations
* Setting key expiration using TTL
* Using Redis as a cache for API responses
* Reducing repeated API requests by serving cached data
* Integrating Redis with an Express server
* Making external API requests using Axios

## Tech Stack

* **Node.js**
* **Express**
* **Redis**
* **ioredis**
* **Axios**

## Project Structure

```text
redis-playground/
│
├── client.js          # Creates and exports the Redis client
├── server.js          # Express server demonstrating Redis caching
├── string.js          # Redis string operations and TTL example
├── package.json
├── package-lock.json
└── .gitignore
```

## Redis Client

`client.js` creates a Redis client using `ioredis` and exports it so that it can be reused throughout the application.

```js
const Redis = require("ioredis");

const client = new Redis();

module.exports = client;
```

## Redis String Operations

`string.js` demonstrates basic Redis string operations.

It:

1. Stores a value using `SET`
2. Sets a TTL using `EXPIRE`
3. Retrieves the value using `GET`

Example:

```text
SET msg:1 "hello guys"
EXPIRE msg:1 10
GET msg:1
```

The key automatically expires after 10 seconds.

Run it with:

```bash
node string.js
```

Expected output:

```text
value -> hello guys
```

## Redis API Caching

`server.js` demonstrates a common real-world Redis use case: **API response caching**.

The application exposes:

```text
GET /
```

When a request arrives:

```text
Client
   |
   v
Express Server
   |
   v
Check Redis
   |
   +---- Cache HIT ----> Return cached data
   |
   +---- Cache MISS
            |
            v
      JSONPlaceholder API
            |
            v
        Store in Redis
            |
            v
        Return response
```

The application caches the response from:

```text
https://jsonplaceholder.typicode.com/todos
```

The cached value is stored using the Redis key:

```text
todos
```

and expires after **30 seconds**.

Therefore, repeated requests within the 30-second TTL can be served from Redis instead of making another request to the external API.

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* Redis

You can run Redis locally or using Docker.

### 1. Clone the repository

```bash
git clone https://github.com/Anshu230806/redis-playground.git
```

### 2. Navigate to the project

```bash
cd redis-playground
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start Redis

Make sure your Redis server is running on the default Redis port:

```text
localhost:6379
```

### 5. Run the Redis string example

```bash
node string.js
```

### 6. Run the Express caching server

```bash
node server.js
```

The server runs on:

```text
http://localhost:9000
```

Open the URL in your browser or use:

```bash
curl http://localhost:9000
```

## Cache Behavior

On the first request:

```text
GET /
   ↓
Redis GET "todos"
   ↓
Cache MISS
   ↓
Request external API
   ↓
Store response in Redis
   ↓
Return response
```

On subsequent requests within 30 seconds:

```text
GET /
   ↓
Redis GET "todos"
   ↓
Cache HIT
   ↓
Return cached response
```

After 30 seconds, the Redis key expires:

```text
todos → expired
```

The next request becomes a cache miss and fetches the data from the external API again.

## Redis Concepts Covered

This playground currently focuses on:

| Redis Concept            | Demonstrated |
| ------------------------ | ------------ |
| Redis Client             | Yes          |
| `SET`                    | Yes          |
| `GET`                    | Yes          |
| TTL / `EXPIRE`           | Yes          |
| API Caching              | Yes          |
| Cache Hit                | Yes          |
| Cache Miss               | Yes          |
| Express Integration      | Yes          |
| External API Integration | Yes          |

## Learning Goal

The purpose of this project is to build a practical understanding of Redis before using it in larger backend systems.

The main concept demonstrated is:

> **Redis can be used as a fast caching layer between an application and a slower data source or external API.**


