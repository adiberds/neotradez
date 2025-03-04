"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageIcon, Loader2, X } from "lucide-react"
import { uploadImage } from "@/lib/upload"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface ImageUploadProps {
  value: string[]
  onChange: (value: string[]) => void
  maxFiles?: number
  disabled?: boolean
}

export function ImageUpload({
  value,
  onChange,
  maxFiles = 5,
  disabled,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const { toast } = useToast()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || isUploading) return

      setIsUploading(true)
      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }))
          try {
            const url = await uploadImage(file)
            setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }))
            return url
          } catch (error) {
            toast({
              title: "Upload failed",
              description: `Failed to upload ${file.name}. Please try again.`,
              variant: "destructive",
            })
            return null
          }
        })

        const urls = (await Promise.all(uploadPromises)).filter((url): url is string => url !== null)
        onChange([...value, ...urls])
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload images. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsUploading(false)
        setUploadProgress({})
      }
    },
    [disabled, isUploading, onChange, toast, value]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles,
    disabled: disabled || isUploading || value.length >= maxFiles,
  })

  const removeImage = (url: string) => {
    onChange(value.filter((image) => image !== url))
  }

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
          isDragActive && "border-primary bg-primary/5",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-muted-foreground" />
        ) : (
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          {isDragActive
            ? "Drop the files here"
            : "Drag & drop images here, or click to select files"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          PNG, JPG, GIF, WEBP up to {maxFiles} files
        </p>
      </Card>

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {value.map((url) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt="Uploaded image"
                className="h-32 w-full object-cover rounded-lg"
              />
              {!disabled && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(url)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 