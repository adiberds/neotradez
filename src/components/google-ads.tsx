"use client"

import { useEffect } from "react"

interface GoogleAdsProps {
  slot: string
  format?: "auto" | "rectangle" | "vertical" | "horizontal"
  style?: React.CSSProperties
}

export function GoogleAds({ slot, format = "auto", style }: GoogleAdsProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error("Error loading Google Ads:", error)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
        ...style,
      }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
} 