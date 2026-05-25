import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { Mail, Sparkles, User, Lock, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"

const inputClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-orange-400/45 focus:bg-white/8 focus:ring-4 focus:ring-orange-400/12"

const LoginDialog = ({ open, onOpenChange, onLogin }) => {
  const { loginWithGoogle, signupWithEmail, loginWithEmail } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [authLoading, setAuthLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        email: "",
        password: "",
      })
      setAuthLoading(false)
      setError("")
      setIsSignUp(false)
    }
  }, [open])

  async function handleGoogleLogin() {
    try {
      setAuthLoading(true)
      setError("")
      await loginWithGoogle()
      onLogin?.()
      onOpenChange(false)
    } catch (err) {
      console.error("Google login error:", err)
      setError(err.message || "Failed to sign in with Google")
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      setAuthLoading(true)
      setError("")
      if (isSignUp) {
        if (!formData.name.trim()) {
          throw new Error("Please enter your name.")
        }
        await signupWithEmail(formData.email.trim(), formData.password, formData.name.trim())
      } else {
        await loginWithEmail(formData.email.trim(), formData.password)
      }
      onLogin?.()
      onOpenChange(false)
    } catch (err) {
      console.error("Auth error:", err)
      let msg = err.message
      if (err.code === "auth/email-already-in-use") {
        msg = "This email is already in use by another account."
      } else if (err.code === "auth/invalid-credential") {
        msg = "Incorrect email or password. Please try again."
      } else if (err.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters long."
      } else if (err.code === "auth/invalid-email") {
        msg = "Please enter a valid email address."
      }
      setError(msg)
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] rounded-[28px] border border-white/12 bg-[#151515]/96 p-0 text-white shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:max-w-lg">
        <div className="border-b border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,132,53,0.16),transparent_56%),radial-gradient(circle_at_88%_12%,rgba(255,184,77,0.1),transparent_34%)] px-6 pb-5 pt-6 sm:px-7">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-100/90">
            <Sparkles className="size-4 text-orange-400" />
            {isSignUp ? "Create your profile" : "Sign in to continue"}
          </div>
          <DialogHeader className="gap-3">
            <DialogTitle className="text-2xl font-semibold text-white sm:text-3xl">
              {isSignUp ? "Join Trippn AI" : "Save your trip planning progress"}
            </DialogTitle>
            <DialogDescription className="max-w-md text-sm leading-6 text-white/65 sm:text-base">
              {isSignUp 
                ? "Create a secure account to save your generated itineraries, customize trips, and access them from anywhere."
                : "Sign in to continue generating your personalized itinerary, sync details, and keep your travel plans tied to your profile."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6 sm:px-7">
          {error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
              <AlertCircle className="size-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={authLoading}
              className="flex min-h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-4 text-left text-white shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-orange-400/30 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.05))] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white/90 shadow-[0_10px_24px_rgba(255,255,255,0.08)]">
                  <FcGoogle className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">
                    {authLoading ? "Connecting to Google..." : "Continue with Google"}
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
                Or use email & password
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>

          {isSignUp && (
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
          )}

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

          <div className="space-y-2">
            <label htmlFor="login-password" className="text-sm font-medium text-white/80">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/35" />
              <input
                id="login-password"
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder={isSignUp ? "Create a password (min 6 chars)" : "Enter your password"}
                className={`${inputClassName} pl-11`}
              />
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-white/60">
            {isSignUp ? (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false)
                    setError("")
                  }}
                  className="font-medium text-orange-400 hover:underline"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true)
                    setError("")
                  }}
                  className="font-medium text-orange-400 hover:underline"
                >
                  Sign Up
                </button>
              </span>
            )}
          </div>

          <DialogFooter className="mt-4 border-white/8 bg-white/3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={authLoading}
              className="rounded-2xl border-white/12 bg-white/5 text-white hover:border-orange-400/25 hover:bg-white/10"
              onClick={() => onOpenChange(false)}
            >
              Maybe later
            </Button>
            <Button
              type="submit"
              disabled={authLoading}
              className="rounded-2xl border border-orange-400/30 bg-orange-500 text-white shadow-[0_12px_35px_rgba(255,132,53,0.24)] hover:bg-orange-400"
            >
              {authLoading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
