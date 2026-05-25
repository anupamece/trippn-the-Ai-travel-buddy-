
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LogOut, MapPinned, Plus, User, Compass } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import LoginDialog from './LoginDialog'
import LogoutDialog from './LogOutDialog'

const Header = () => {
  const { user, logout } = useAuth()
  const [openLoginDialog, setOpenLoginDialog] = useState(false)
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)

  async function handleLogout() {
    try {
      await logout()
      setOpenLogoutDialog(false)
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="mx-auto flex max-w-[calc(100%-12px)] items-center justify-between gap-3 rounded-[20px] border border-white/8 bg-[#151515]/92 px-3 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:px-4">
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded-sm  px-2.5 py-1.5 transition-all duration-300  hover:bg-white/1"
        >      
        <img src="/logo .png" alt="Trippn logo" className='h-12 w-12 object-contain drop-shadow-[0_10px_24px_rgba(255,132,53,0.2)] sm:h-14 sm:w-14' />

          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold tracking-[0.16em] text-white">
                TRIPPN
              </span>
              <MapPinned className="size-3.5 text-orange-400/80 transition-transform duration-300 group-hover:translate-x-0.2 group-hover:-translate-y-0.2" />
            </div>
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/45">
              AI Trip Planner
            </p>
            
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {user && (
            <Link
              to="/my-trips"
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-[18px] border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-white/85 transition-all duration-300 hover:border-orange-400/30 hover:bg-white/[0.08]"
            >
              <Compass className="size-4 text-orange-400" />
              <span>My Trips</span>
            </Link>
          )}

          <Link
            to="/create-trip"
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-[18px] border border-orange-400/25 bg-orange-500 px-2.5 text-sm font-medium whitespace-nowrap text-white shadow-[0_10px_26px_rgba(255,132,53,0.24)] transition-all duration-300 hover:scale-101 hover:border-orange-300/40 hover:bg-orange-400 hover:shadow-[0_16px_34px_rgba(255,132,53,0.32)] active:translate-y-0"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Create Trip</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden rounded-[18px] border border-white/12 bg-white/6 px-3 py-2 text-sm text-white/85 sm:flex sm:items-center sm:gap-2">
                <User className="size-4 text-orange-400" />
                <span className="max-w-28 truncate">{user.displayName || user.email || 'Traveler'}</span>
              </div>
              <button
                type="button"
                onClick={() => setOpenLogoutDialog(true)}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'default' }),
                  'rounded-[18px] border-white/10 bg-white/[0.03] text-white transition-all duration-300 hover:border-orange-400/30 hover:bg-white/[0.06] cursor-pointer'
                )}
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setOpenLoginDialog(true)}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'default' }),
                'rounded-[18px] border-white/10 bg-white/[0.03] text-white transition-all duration-300 hover:border-orange-400/30 hover:bg-white/[0.06] cursor-pointer'
              )}
            >
              <User className="size-4" />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}
        </div>
      </div>
      </header>

      <LoginDialog
        open={openLoginDialog}
        onOpenChange={setOpenLoginDialog}
      />

      <LogoutDialog
        open={openLogoutDialog}
        onOpenChange={setOpenLogoutDialog}
        onConfirm={handleLogout}
      />
    </>
  )
}

export default Header

