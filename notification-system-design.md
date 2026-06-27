# Notification System Design

## Stage 1

### Objective

Design REST APIs for a notification platform that enables students to receive placement, result, and event notifications. The APIs are designed with predictable REST endpoints, consistent JSON contracts, proper HTTP methods, authentication headers, and support for real-time notifications.

---

## Authentication

All APIs are protected.

### Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
Accept: application/json
```

All requests require a valid Bearer Token obtained during the authentication process.

---

## Notification Types and Priority

| Notification Type | Priority |
|-------------------|----------|
| Placement | High (3) |
| Result | Medium (2) |
| Event | Low (1) |

---

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

## Notification Schema

```json
{
  "id": "UUID",
  "studentId": "1042",
  "notificationType": "Placement",
  "message": "Amazon Hiring",
  "priority": 3,
  "isRead": false,
  "createdAt": "2026-04-22T17:51:30Z",
  "updatedAt": "2026-04-22T17:51:30Z"
}
```

---

## 1. Get All Notifications

### Endpoint

```http
GET /api/v1/notifications
```

### Query Parameters

| Parameter | Description |
|------------|-------------|
| page | Page number |
| limit | Number of notifications |
| notification_type | Event / Result / Placement |

Example

```http
GET /api/v1/notifications?page=1&limit=10&notification_type=Placement
```

### Request Headers

```http
Authorization: Bearer <token>
```

### Response

```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "total": 54,
  "notifications": [
    {
      "id": "d146095a",
      "notificationType": "Placement",
      "message": "Amazon Hiring",
      "isRead": false,
      "priority": 3,
      "createdAt": "2026-04-22T17:51:30Z"
    }
  ]
}
```

---

## 2. Get Priority Notifications

### Endpoint

```http
GET /api/v1/notifications/priority
```

### Query Parameters

| Parameter | Description |
|------------|-------------|
| n | Number of notifications |

Example

```http
GET /api/v1/notifications/priority?n=10
```

### Response

```json
{
  "success": true,
  "notifications": [
    {
      "id": "d146095a",
      "notificationType": "Placement",
      "priority": 3,
      "message": "Amazon Hiring"
    }
  ]
}
```

---

## 3. Mark Notification as Read

### Endpoint

```http
PATCH /api/v1/notifications/{id}/read
```

### Response

```json
{
  "success": true,
  "message": "Notification marked as read."
}
```

---

## 4. Mark All Notifications as Read

### Endpoint

```http
PATCH /api/v1/notifications/read-all
```

### Response

```json
{
  "success": true,
  "message": "All notifications marked as read."
}
```

---

## 5. Create Notification

### Endpoint

```http
POST /api/v1/notifications
```

### Request

```json
{
  "studentId": "1042",
  "notificationType": "Placement",
  "message": "Amazon Hiring Drive"
}
```

### Response

```json
{
  "success": true,
  "message": "Notification created successfully."
}
```

---

## 6. Delete Notification

### Endpoint

```http
DELETE /api/v1/notifications/{id}
```

### Response

```json
{
  "success": true,
  "message": "Notification deleted successfully."
}
```

---

## Real-Time Notification Mechanism

The application supports real-time notifications using WebSockets (Socket.IO).

### Flow

1. Student logs into the application.
2. Client establishes a WebSocket connection.
3. Backend listens for newly created notifications.
4. When a notification is created, the server pushes it instantly to the connected client.
5. The frontend updates the notification list without refreshing the page.

### Advantages

- Low latency
- Real-time updates
- Reduced polling requests
- Better user experience

---

## API Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/notifications | Get all notifications |
| GET | /api/v1/notifications/priority | Get top priority notifications |
| POST | /api/v1/notifications | Create notification |
| PATCH | /api/v1/notifications/{id}/read | Mark notification as read |
| PATCH | /api/v1/notifications/read-all | Mark all notifications as read |
| DELETE | /api/v1/notifications/{id} | Delete notification |

---

# Stage 2

## Recommended Database

PostgreSQL is the preferred database because it provides ACID compliance, strong consistency, efficient indexing, excellent reliability, and high performance for relational data. Since notifications are associated with students through relationships, PostgreSQL is a suitable choice.

---

## Database Schema

### Students Table

| Column | Type | Description |
|--------|------|-------------|
| studentId | BIGINT (PK) | Unique Student ID |
| name | VARCHAR(100) | Student Name |
| email | VARCHAR(150) | Student Email |

### Notifications Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Notification ID |
| studentId | BIGINT (FK) | Student ID |
| notificationType | ENUM('Placement','Result','Event') | Notification Category |
| message | TEXT | Notification Message |
| priority | INT | Priority (3 High, 2 Medium, 1 Low) |
| isRead | BOOLEAN | Read Status |
| createdAt | TIMESTAMP | Creation Time |
| updatedAt | TIMESTAMP | Last Updated |

---

## Relationship

One Student can receive multiple Notifications.

```
Students (1)
      |
      | studentId
      |
Notifications (N)
```

---

## Recommended Indexes

```sql
CREATE INDEX idx_student_notifications
ON notifications(studentId);

CREATE INDEX idx_student_read
ON notifications(studentId, isRead);

CREATE INDEX idx_priority_time
ON notifications(priority DESC, createdAt DESC);
```

---

## Challenges with Large Data

When the notification table grows to millions of records:

- Slow query execution
- Increased disk I/O
- Full table scans
- Expensive sorting
- Higher response time

---

## Solutions

- Composite Indexes
- Pagination using LIMIT and OFFSET
- Partition tables by date
- Redis caching
- Archive old notifications
- Connection pooling
- Background workers for heavy processing

---

## Example SQL Queries

### Fetch Notifications

```sql
SELECT
    id,
    notificationType,
    message,
    isRead,
    createdAt
FROM notifications
WHERE studentId = 1042
ORDER BY createdAt DESC
LIMIT 10 OFFSET 0;
```

### Mark Notification as Read

```sql
UPDATE notifications
SET isRead = TRUE
WHERE id = 'notification-id';
```

### Delete Notification

```sql
DELETE FROM notifications
WHERE id = 'notification-id';
```

### Insert Notification

```sql
INSERT INTO notifications
(studentId, notificationType, message, priority, isRead, createdAt)
VALUES
(1042, 'Placement', 'Amazon Hiring Drive', 3, FALSE, NOW());
```
# Stage 3

## SQL Query Optimization

### Existing Query

```sql
SELECT *
FROM notifications
WHERE studentId = 1042
AND isRead = FALSE
ORDER BY createdAt;
```

---

## Issues with the Current Query

The above query works correctly but is not optimized for large datasets.

### Problems

1. Uses `SELECT *`, which retrieves unnecessary columns and increases data transfer.
2. If no indexes exist on `studentId`, `isRead`, and `createdAt`, the database performs a full table scan.
3. Sorting by `createdAt` becomes expensive as the table grows.
4. Query performance degrades significantly when millions of notifications are stored.

---

## Optimized Query

```sql
SELECT
    id,
    notificationType,
    message,
    priority,
    isRead,
    createdAt
FROM notifications
WHERE studentId = 1042
AND isRead = FALSE
ORDER BY createdAt DESC
LIMIT 20;
```

---

## Why is this Better?

- Retrieves only required columns.
- Uses descending order to fetch the latest notifications first.
- Limits the number of records returned.
- Reduces memory usage and network traffic.

---

## Recommended Index

```sql
CREATE INDEX idx_notifications_student_read_created
ON notifications(studentId, isRead, createdAt DESC);
```

### Why this Index?

- Filters quickly using `studentId`
- Filters unread notifications using `isRead`
- Returns results already sorted by `createdAt`
- Eliminates unnecessary sorting operations

---

## Why Not Index Every Column?

Although indexes improve read performance, indexing every column is not recommended because:

- Additional storage is required.
- Insert and Update operations become slower.
- Index maintenance increases database overhead.
- Many indexes may never be used by the query optimizer.

Therefore, indexes should only be created for frequently searched, filtered, sorted, or joined columns.

---

## SQL Query

### Find students who received Placement notifications in the last 7 days.

```sql
SELECT DISTINCT
    s.studentId,
    s.name,
    s.email
FROM students s
JOIN notifications n
ON s.studentId = n.studentId
WHERE n.notificationType = 'Placement'
AND n.createdAt >= NOW() - INTERVAL '7 DAYS';
```

---

## Time Complexity

### Without Index

- Full Table Scan
- Complexity: **O(n)**

### With Composite Index

- Index Lookup
- Complexity: **O(log n)**

---

## Benefits of Optimization

- Faster query execution
- Reduced database load
- Lower disk I/O
- Better scalability
- Faster response time
- Efficient use of indexes

# Stage 4

## Performance Optimization Strategy

As the notification system grows to support millions of users and notifications, maintaining high performance becomes essential. The following optimizations improve scalability, reduce response time, and ensure a smooth user experience.

---

## 1. Pagination

Instead of returning all notifications in a single request, the backend should return notifications page by page.

Example:

```http
GET /api/v1/notifications?page=1&limit=20
```

### Benefits

- Reduces response size
- Faster API responses
- Lower memory consumption
- Better user experience

---

## 2. Database Indexing

Indexes should be created on frequently searched columns.

Recommended indexes:

```sql
CREATE INDEX idx_student_notifications
ON notifications(studentId);

CREATE INDEX idx_student_read
ON notifications(studentId, isRead);

CREATE INDEX idx_priority_created
ON notifications(priority DESC, createdAt DESC);
```

### Benefits

- Faster filtering
- Faster sorting
- Reduced full table scans

---

## 3. Redis Caching

Frequently accessed notifications can be stored in Redis.

Example Cache Key:

```
notifications:studentId:1042
```

### Benefits

- Faster reads
- Reduced database load
- Lower response time

---

## 4. Connection Pooling

Instead of opening a new database connection for every request, maintain a pool of reusable connections.

### Benefits

- Faster database communication
- Reduced overhead
- Better throughput

---

## 5. Background Processing

Heavy operations such as sending emails, SMS, or push notifications should be processed asynchronously using background workers.

Possible technologies:

- RabbitMQ
- Kafka
- Bull Queue
- Redis Queue

### Benefits

- Faster API responses
- Better scalability
- Improved reliability

---

## 6. Table Partitioning

As notification records increase, partition the table based on creation date.

Example:

- notifications_2025
- notifications_2026
- notifications_2027

### Benefits

- Faster queries
- Smaller partitions
- Easier maintenance

---

## 7. Archive Old Notifications

Notifications older than one year can be moved to archive tables.

### Benefits

- Smaller active database
- Faster searches
- Reduced storage costs

---

## 8. Compression

Compress notification payloads before transmitting over the network.

### Benefits

- Reduced bandwidth
- Faster response time

---

## 9. Monitoring

Continuously monitor application performance.

Recommended tools:

- Prometheus
- Grafana
- ELK Stack

Metrics to monitor:

- API latency
- Database response time
- CPU usage
- Memory usage
- Error rate

---

## Expected Improvements

| Optimization | Benefit |
|--------------|---------|
| Pagination | Faster API responses |
| Indexing | Faster SQL queries |
| Redis Cache | Reduced database load |
| Connection Pooling | Efficient DB usage |
| Background Workers | Non-blocking operations |
| Partitioning | Better scalability |
| Monitoring | Easier issue detection |

---

## Conclusion

By combining pagination, indexing, caching, asynchronous processing, database partitioning, and monitoring, the notification system can efficiently support millions of notifications while maintaining low latency and high availability.

# Stage 5

## High-Level System Design

The notification system is designed using a scalable microservice architecture. Notifications are created by different services (Placement, Results, Events) and delivered to students through REST APIs and real-time WebSocket connections.

---

## System Architecture

```
                +---------------------+
                |     React Client    |
                +----------+----------+
                           |
                    REST API / WebSocket
                           |
                +----------v----------+
                |    Node.js Backend  |
                |     (Express API)   |
                +----------+----------+
                           |
        +------------------+------------------+
        |                  |                  |
        |                  |                  |
+-------v------+   +--------v-------+   +------v-------+
| Logging API  |   | Notification   |   | Redis Cache  |
| (Middleware) |   | Service        |   |              |
+--------------+   +--------+-------+   +------+-------+
                           |                     |
                           |                     |
                    +------v---------------------v------+
                    |         PostgreSQL Database       |
                    +-----------------------------------+
```

---

## Components

### React Frontend

Responsibilities:

- Display notifications
- Show priority notifications
- Pagination
- Search & Filter
- Mark notifications as read
- Connect using WebSocket

---

### Express Backend

Responsibilities:

- Handle REST APIs
- Validate requests
- Call Logging Middleware
- Fetch notifications
- Return JSON responses

---

### Logging Middleware

Responsibilities:

- Log every API request
- Log errors
- Log successful operations
- Send logs to AffordMed Logging API

Example:

```javascript
await Log(
    "backend",
    "info",
    "service",
    "Fetched notifications successfully"
);
```

---

### PostgreSQL Database

Stores:

- Students
- Notifications

Indexes:

- studentId
- isRead
- priority
- createdAt

---

### Redis Cache

Caches:

- Frequently accessed notifications
- Priority notifications

Advantages:

- Faster responses
- Reduced database load

---

### WebSocket Server

Used for:

- Real-time notification delivery
- Instant UI updates

Flow:

Backend

↓

WebSocket

↓

React

↓

Notification appears instantly

---

## Notification Flow

1. Admin creates a notification.
2. Backend validates the request.
3. Notification is stored in PostgreSQL.
4. Logging Middleware records the operation.
5. Notification is cached in Redis.
6. Backend pushes the notification through WebSocket.
7. React client receives the notification instantly.
8. Student views the notification.

---

## Scalability

The architecture supports scaling through:

- Stateless backend servers
- Redis caching
- Database indexing
- Horizontal scaling
- Load balancer
- Background workers

---

## Fault Tolerance

The system remains reliable by using:

- Error handling
- Retry mechanism
- Logging Middleware
- Database transactions
- Health monitoring

---

## Security

Security measures include:

- JWT Authentication
- HTTPS
- Input validation
- Parameterized SQL queries
- Role-based authorization

---

## Advantages

- High Performance
- Low Latency
- Scalable
- Secure
- Fault Tolerant
- Easy to Maintain

---

## Conclusion

The proposed notification system follows modern backend architecture principles using React, Node.js, PostgreSQL, Redis, WebSockets, and the AffordMed Logging Middleware. The design supports real-time communication, scalability, reliability, and efficient notification management.
