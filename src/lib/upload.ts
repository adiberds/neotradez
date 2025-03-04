import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to upload image")
  }

  const data = await response.json()
  
  // Get the public_id from the uploaded image URL
  const publicId = data.public_id

  // Generate optimized URL with auto-format and auto-quality
  const optimizedUrl = cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
    width: 800, // Max width for listings
    height: 800, // Max height for listings
    crop: "limit", // Maintain aspect ratio while resizing
  })

  return optimizedUrl
}

export async function deleteImage(publicId: string): Promise<void> {
  const response = await fetch(`/api/upload?publicId=${publicId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete image")
  }
}

// Utility function to get optimized image URL
export function getOptimizedImageUrl(publicId: string, options: {
  width?: number;
  height?: number;
  crop?: string;
  gravity?: string;
} = {}): string {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
    ...options,
  })
} 