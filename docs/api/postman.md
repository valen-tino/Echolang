# Postman Collection

## Import Collection

1. Download the [EchoLang Postman Collection](./echolang-postman-collection.json)
2. In Postman, click "Import" and select the downloaded file
3. Create an environment and set these variables:
   - `baseUrl`
   - `token`

## Environment Setup

```json
{
  "name": "EchoLang Development",
  "values": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3001/api",
      "enabled": true
    },
    {
      "key": "token",
      "value": "your_jwt_token",
      "enabled": true
    }
  ]
}
```

## Pre-request Script

The collection includes a pre-request script that automatically refreshes expired tokens:

```javascript
if (pm.environment.get('token')) {
  pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
  });
}
```