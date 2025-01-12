# Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `AUTH_INVALID_CREDENTIALS` | Invalid email or password | 401 |
| `AUTH_TOKEN_EXPIRED` | JWT token has expired | 401 |
| `AUTH_TOKEN_INVALID` | Invalid JWT token | 401 |
| `VIDEO_TOO_LARGE` | Video file exceeds size limit | 413 |
| `VIDEO_INVALID_FORMAT` | Unsupported video format | 415 |
| `VIDEO_NOT_FOUND` | Video ID not found | 404 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `INSUFFICIENT_CREDITS` | Account has insufficient credits | 402 |
| `INVALID_LANGUAGE` | Unsupported language code | 400 |
| `SERVER_ERROR` | Internal server error | 500 |

## Error Response Examples

### Authentication Error

```json
{
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

### Rate Limit Error

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "details": {
      "retryAfter": 60
    }
  }
}
```