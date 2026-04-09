import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useGoogleLogin } from "@react-oauth/google"
import { Mail, Sparkles, User } from "lucide-react"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"

const inputClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-orange-400/45 focus:bg-white/8 focus:ring-4 focus:ring-orange-400/12"

const LoginDialog = ({ open, onOpenChange, onLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        email: "",
      })
      setGoogleLoading(false)
    }
  }, [open])

  function persistUser(nextUser) {
    localStorage.setItem("user", JSON.stringify(nextUser))
    window.dispatchEvent(new Event("auth-changed"))
    onLogin?.(nextUser)
    onOpenChange(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextUser = {
      name: formData.name.trim() || "Traveler",
      email: formData.email.trim(),
    }

    persistUser(nextUser)
  }

  const loginWithGoogle = useGoogleLogin({
    scope: "openid profile email",
    onSuccess: async (tokenResponse) => {
      try {
        setGoogleLoading(true)

        const profileResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        })

        if (!profileResponse.ok) {
          throw new Error("Failed to load Google profile")
        }

        const profile = await profileResponse.json()

        persistUser({
          name: profile.name || "Traveler",
          email: profile.email || "",
          picture: profile.picture || "",
          provider: "google",
        })
      } catch (error) {
        console.error("Google profile fetch failed:", error)
      } finally {
        setGoogleLoading(false)
      }
    },
    onError: () => {
      console.error("Google login failed")
      setGoogleLoading(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] rounded-[28px] border border-white/12 bg-[#151515]/96 p-0 text-white shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:max-w-lg">
        <div className="border-b border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,132,53,0.16),transparent_56%),radial-gradient(circle_at_88%_12%,rgba(255,184,77,0.1),transparent_34%)] px-6 pb-5 pt-6 sm:px-7">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-100/90">
            <Sparkles className="size-4 text-orange-400" />
            Sign in to continue
          </div>
          <DialogHeader className="gap-3">
            <DialogTitle className="text-2xl font-semibold text-white sm:text-3xl">
              Save your trip planning progress
            </DialogTitle>
            <DialogDescription className="max-w-md text-sm leading-6 text-white/65 sm:text-base">
              Enter a few details to continue generating your personalized itinerary and keep your travel plans tied to your profile.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-7">
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => loginWithGoogle()}
              disabled={googleLoading}
              className="flex min-h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-4 text-left text-white shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-orange-400/30 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.05))] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white/90 shadow-[0_10px_24px_rgba(255,255,255,0.08)]">
                  <FcGoogle className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">
                    {googleLoading ? "Connecting to Google..." : "Continue with Google"}
                  </span>
                  <span className="block text-xs text-white/50">
                    Fast sign-in with your Google account
                  </span>
                </span>
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/35">
                Or continue manually
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="login-name" className="text-sm font-medium text-white/80">
              Full Name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/35" />
              <input
                id="login-name"
                type="text"
                required
                value={formData.name}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="Enter your name"
                className={`${inputClassName} pl-11`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="login-email" className="text-sm font-medium text-white/80">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/35" />
              <input
                id="login-email"
                type="email"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="Enter your email"
                className={`${inputClassName} pl-11`}
              />
            </div>
          </div>

          <DialogFooter className="mt-2 border-white/8 bg-white/3">
            <Button
              type="button"
              variant="outline"
              className="rounded-2xl border-white/12 bg-white/5 text-white hover:border-orange-400/25 hover:bg-white/10"
              onClick={() => onOpenChange(false)}
            >
              Maybe later
            </Button>
            <Button
              type="submit"
              className="rounded-2xl border border-orange-400/30 bg-orange-500 text-white shadow-[0_12px_35px_rgba(255,132,53,0.24)] hover:bg-orange-400"
            >
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
