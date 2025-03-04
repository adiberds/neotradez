import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyRequestPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We've sent you a sign in link. Please check your email and click the link to sign in.
          </p>
          <p className="text-sm text-muted-foreground">
            If you don't see the email, please check your spam folder.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 