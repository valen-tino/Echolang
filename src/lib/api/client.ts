import { Video } from '@/features/videos/types';

const API_BASE_URL = '/api';

export async function fetchVideos(userId?: string, page = 1, limit = 12) {
  const params = new URLSearchParams({
    ...(userId && { userId }),
    page: page.toString(),
    limit: limit.toString()
  });

  const response = await fetch(`${API_BASE_URL}/videos?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }

  return response.json();
}

export async function fetchVideoById(id: string) {
  const response = await fetch(`${API_BASE_URL}/videos/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch video');
  }

  return response.json();
}

export async function createVideo(video: Omit<Video, '_id'>) {
  const response = await fetch(`${API_BASE_URL}/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(video)
  });

  if (!response.ok) {
    throw new Error('Failed to create video');
  }

  return response.json();
}

export async function updateVideo(id: string, updates: Partial<Video>) {
  const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error('Failed to update video');
  }

  return response.json();
}

export async function deleteVideo(id: string) {
  const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete video');
  }

  return response.json();
}