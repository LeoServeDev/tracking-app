# Time Tracking API Endpoints

## Base URL
`http://localhost:5000/api`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 1. User Profile Endpoints

### GET /api/user/profile
**Description:** Fetch user profile information
**Authentication:** Required
**Response:**
```json
{
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "worker",
    "profilePicture": "url_to_picture",
    "phone": "+1234567890",
    "department": "Engineering",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT /api/user/profile
**Description:** Update user profile information
**Authentication:** Required
**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "department": "Engineering",
  "profilePicture": "url_to_picture",
  "isActive": true
}
```
**Response:** Same as GET /api/user/profile

---

## 2. Punch In/Out (Time Tracking) Endpoints

### POST /api/punch
**Description:** Punch in or out
**Authentication:** Required
**Request Body:**
```json
{
  "punchType": "in" | "out",
  "notes": "Optional notes about the punch"
}
```
**Response:**
```json
{
  "punchRecord": {
    "_id": "punch_id",
    "user": "user_id",
    "punchIn": "2024-01-01T09:00:00.000Z",
    "punchOut": "2024-01-01T17:00:00.000Z",
    "date": "2024-01-01T00:00:00.000Z",
    "location": "IP: 192.168.1.1",
    "device": "Desktop (Mozilla/5.0)",
    "notes": "Optional notes",
    "punchType": "in",
    "isManual": false,
    "createdAt": "2024-01-01T09:00:00.000Z",
    "updatedAt": "2024-01-01T09:00:00.000Z"
  }
}
```

### GET /api/punch
**Description:** Fetch all punch records for the user
**Authentication:** Required
**Response:**
```json
{
  "punches": [
    {
      "_id": "punch_id",
      "user": {
        "_id": "user_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "punchIn": "2024-01-01T09:00:00.000Z",
      "punchOut": "2024-01-01T17:00:00.000Z",
      "date": "2024-01-01T00:00:00.000Z",
      "location": "IP: 192.168.1.1",
      "device": "Desktop (Mozilla/5.0)",
      "notes": "Optional notes",
      "punchType": "in",
      "isManual": false,
      "createdAt": "2024-01-01T09:00:00.000Z",
      "updatedAt": "2024-01-01T09:00:00.000Z"
    }
  ]
}
```

### GET /api/punch/today
**Description:** Fetch today's punch records
**Authentication:** Required
**Response:** Same format as GET /api/punch

### GET /api/punch/week
**Description:** Fetch this week's punch records (Monday to Sunday)
**Authentication:** Required
**Response:** Same format as GET /api/punch

### DELETE /api/punch/:id
**Description:** Delete a specific punch record
**Authentication:** Required
**Response:**
```json
{
  "message": "Punch record deleted successfully"
}
```

---

## 3. Stats Endpoints

### GET /api/punch/stats?range=week|month
**Description:** Get punch statistics for the specified range
**Authentication:** Required
**Query Parameters:**
- `range`: "week" or "month" (default: "week")

**Response:**
```json
{
  "stats": {
    "range": "week",
    "totalHours": 40.5,
    "totalDays": 5,
    "averageHoursPerDay": 8.1,
    "dailyHours": {
      "2024-01-01": 8.5,
      "2024-01-02": 8.0,
      "2024-01-03": 8.5,
      "2024-01-04": 8.0,
      "2024-01-05": 7.5
    }
  }
}
```

---

## 4. Authentication Endpoints

### POST /api/auth/register
**Description:** Register a new user
**Authentication:** Not required
**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "User registered successfully."
}
```

### POST /api/auth/login
**Description:** Login user
**Authentication:** Not required
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "worker"
  }
}
```

### POST /api/auth/logout
**Description:** Logout user (client-side token removal)
**Authentication:** Required
**Response:**
```json
{
  "message": "Logged out successfully."
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Error description"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided" | "Invalid or expired token" | "User account is deactivated"
}
```

### 404 Not Found
```json
{
  "message": "User not found." | "Punch record not found"
}
```

### 409 Conflict
```json
{
  "message": "Email already in use." | "Already punched in today"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Features Implemented

✅ **User Profile Management**
- Get user profile with all details
- Update user profile with validation
- Secure password handling

✅ **Time Tracking (Punch In/Out)**
- Punch in/out with automatic timestamp
- Device and location tracking
- Duplicate punch prevention
- Notes support

✅ **Punch Records Management**
- Fetch all punches (paginated)
- Fetch today's punches
- Fetch week's punches
- Delete punch records

✅ **Statistics**
- Weekly/monthly statistics
- Total hours calculation
- Average hours per day
- Daily breakdown

✅ **Security**
- JWT authentication
- Password hashing
- Input validation
- User activity status checking

✅ **Logging**
- Comprehensive request logging
- Error tracking
- Debug information 