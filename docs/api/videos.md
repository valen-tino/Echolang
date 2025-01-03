# Video Endpoints

## Upload Video

Upload a new video for translation.

```
POST /api/videos/upload
```

### Request Headers

```
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

### Request Body

```
file: <video_file>
sourceLanguage: "en"
targetLanguages: ["es", "fr"]
```

### Response

```json
{
  "id": "video_id",
  "status": "processing",
  "uploadUrl": "https://storage.echolang.com/videos/...",
  "metadata": {
    "duration": 120,
    "size": 1024000,
    "format": "mp4"
  }
}
```

### cURL Example

```bash
curl -X POST https://api.echolang.com/videos/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@video.mp4" \
  -F "sourceLanguage=en" \
  -F "targetLanguages=[\"es\",\"fr\"]"
```

## Get Video Status

```
GET /api/videos/:id/status
```

### Response

```json
{
  "id": "video_id",
  "status": "processing",
  "progress": 45,
  "translations": [
    {
      "language": "es",
      "status": "processing",
      "progress": 30
    },
    {
      "language": "fr",
      "status": "queued",
      "progress": 0
    }
  ]
}
```