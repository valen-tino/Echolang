# EchoLang API Testing Guide

This guide provides comprehensive documentation for testing the EchoLang API endpoints.

## Base URL

```
Development: http://localhost:3000/api
```

## Authentication

All API requests require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

To obtain a token, use the authentication endpoints detailed in [Authentication](./authentication.md).

## Rate Limiting

- 100 requests per minute per IP address
- 1000 requests per hour per authenticated user
- Headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Common Headers

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>
```

## Error Handling

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {} // Optional additional information
  }
}
```

See [Error Codes](./error-codes.md) for a complete list of error codes.