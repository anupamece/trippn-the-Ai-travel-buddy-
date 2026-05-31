
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LogOut, MapPinned, Plus, User, Compass, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import LoginDialog from './LoginDialog'
import LogoutDialog from './LogOutDialog'
// import TrippnLogo from './logo.png'

const Header = () => {
  const { user, logout } = useAuth()
  const [openLoginDialog, setOpenLoginDialog] = useState(false)
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 md:px-6">
        <div className="mx-auto flex flex-col max-w-7xl rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 shadow-[0_15px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl md:px-5 transition-all duration-300">
          <div className="flex w-full items-center justify-between">
            <Link
              to="/"
              className="group flex items-center gap-2 px-1 py-0.5 transition-all duration-300 hover:bg-white/[0.02] rounded-md"
            >      
              <img 
                src="/favicon.png" 
                alt="Trippn logo" 
                className="h-9 w-9 md:h-14 md:w-14 object-contain transition-all duration-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.25)]" 
              />

              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-satoshi text-sm md:text-lg font-bold tracking-tight text-white leading-none lowercase">
                    tripp<span className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent font-extrabold">n</span>
                  </span>
                </div>
                <p className="text-[0.45rem] md:text-[0.62rem] font-semibold tracking-[0.18em] text-white/40 mt-1 leading-none uppercase">
                  AI powered travel buddy
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2.5">
              {user && (
                <Link
                  to="/my-trips"
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3.5 text-xs font-semibold uppercase tracking-wider text-white/80 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
                >
                  <Compass className="size-4 text-indigo-400" />
                  <span>My Trips</span>
                </Link>
              )}

              <Link
                to="/create-trip"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-amber-500/30 bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_6px_25px_rgba(245,158,11,0.25)] transition-all duration-300 hover:scale-102 hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)] active:translate-y-0.5"
              >
                <Plus className="size-4" />
                <span>Create Trip</span>
              </Link>

              {user ? (
                <div className="flex items-center gap-2">
                  <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 flex items-center gap-2">
                    <User className="size-4 text-amber-400" />
                    <span className="max-w-28 truncate">{user.displayName || user.email || 'Traveler'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenLogoutDialog(true)}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'default' }),
                      'h-9 rounded-md border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 cursor-pointer'
                    )}
                  >
                    <LogOut className="size-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setOpenLoginDialog(true)}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'default' }),
                    'h-9 rounded-md border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/[0.08] cursor-pointer'
                  )}
                >
                  <User className="size-3.5 text-indigo-400" />
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/[0.08] cursor-pointer"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden w-full"
              >
                <div className="mt-3.5 pt-3.5 border-t border-white/5 flex flex-col gap-2">
                  {user && (
                    <div className="flex w-full h-10 items-center gap-2.5 rounded border border-white/5 bg-white/[0.01] px-3.5 text-xs font-medium text-white/60">
                      <User className="size-4 text-amber-400" />
                      <span className="truncate">{user.displayName || user.email || 'Traveler'}</span>
                    </div>
                  )}

                  {user && (
                    <Link
                      to="/my-trips"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full h-10 items-center gap-2.5 rounded border border-white/5 bg-white/[0.02] px-3.5 text-xs font-semibold uppercase tracking-wider text-white/80 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/5 hover:text-white"
                    >
                      <Compass className="size-4 text-indigo-400" />
                      <span>My Trips</span>
                    </Link>
                  )}

                  <Link
                    to="/create-trip"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full h-10 items-center gap-2.5 rounded border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-3.5 text-xs font-bold uppercase tracking-wider text-amber-400 transition-all duration-300 hover:border-amber-500/40 hover:from-amber-500/20 hover:to-orange-500/20"
                  >
                    <Plus className="size-4 text-amber-400" />
                    <span>Create Trip</span>
                  </Link>

                  {user ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        setOpenLogoutDialog(true)
                      }}
                      className="flex w-full h-10 items-center gap-2.5 rounded border border-red-500/20 bg-red-500/5 px-3.5 text-xs font-semibold uppercase tracking-wider text-red-400 transition-all duration-300 hover:bg-red-500/10 cursor-pointer"
                    >
                      <LogOut className="size-4 text-red-400" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        setOpenLoginDialog(true)
                      }}
                      className="flex w-full h-10 items-center gap-2.5 rounded border border-indigo-500/20 bg-indigo-500/5 px-3.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 transition-all duration-300 hover:bg-indigo-500/10 cursor-pointer"
                    >
                      <User className="size-4 text-indigo-400" />
                      <span>Login</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

