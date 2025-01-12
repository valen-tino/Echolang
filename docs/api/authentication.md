# Authentication

## Login

Authenticate a user and receive a JWT token.

```
POST /api/auth/login
```

### Request Body

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "customer"
  }
}
```

### cURL Example

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"your_password"}'
```

## Refresh Token

```
POST /api/auth/refresh
```

### Request Headers

```
Authorization: Bearer <refresh_token>
```

### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```