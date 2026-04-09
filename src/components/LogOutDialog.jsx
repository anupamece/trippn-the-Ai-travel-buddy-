import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogOut, TriangleAlert } from "lucide-react"

const LogoutDialog = ({ open, onOpenChange, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] rounded-[26px] border border-white/12 bg-[#151515]/96 p-0 text-white shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:max-w-md">
        <div className="border-b border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,132,53,0.14),transparent_58%),radial-gradient(circle_at_86%_8%,rgba(255,184,77,0.09),transparent_34%)] px-6 pb-5 pt-6 sm:px-7">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-orange-100/90">
            <TriangleAlert className="size-4 text-orange-300" />
            Session action
          </div>

          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-200">
            <LogOut className="size-5" />
          </div>

          <DialogHeader className="gap-3">
            <DialogTitle className="text-2xl font-semibold text-white">
              Confirm logout
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-white/65 sm:text-base">
              Are you sure you want to log out? You can sign back in anytime to continue planning your trips.
            </DialogDescription>
          </DialogHeader>
        </div>
    
        <DialogFooter className="-mx-0 -mb-0 rounded-b-[26px] border-t border-white/8 bg-[#111111]/90 px-6 py-5 sm:px-7">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-2xl border-white/12 bg-white/5 text-white hover:border-orange-400/25 hover:bg-white/10 sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="w-full rounded-2xl border border-orange-400/30 bg-orange-500 text-white shadow-[0_12px_35px_rgba(255,132,53,0.24)] hover:bg-orange-400 sm:w-auto"
            onClick={onConfirm}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutDialog
