'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"

import { useRouter } from "next/navigation"
import { SignOut, User } from "@phosphor-icons/react"
import { signOut } from "@/lib/actions/auth.actions"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { toast } from "sonner"

const UserDropdown = () => {
  const router = useRouter()
  const { user, loading } = useCurrentUser()

  const handleLogout = async () => {
    const result = await signOut()
    if (result.success) {
      toast.success('Signed out successfully')
      router.push('/sign-in')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-700/50 rounded-lg px-3 py-2 transition-all duration-200 outline-none border border-transparent hover:border-gray-600">
        {loading ? (
          <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse" />
        ) : (
          <Avatar className="h-8 w-8 ring-2 ring-yellow-500/20">
            <AvatarImage src="https://github.com/shadcn.png" alt={user?.name || 'User'} />
            <AvatarFallback className="bg-yellow-500 text-white font-medium">
              {user?.name?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        className="w-64 p-1.5 bg-gray-800 border-gray-700 rounded-xl shadow-xl shadow-black/20 ring-1 ring-white/5" 
        sideOffset={8}
      >
        {loading ? (
          <div className="p-3 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-700 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-700 animate-pulse" />
                <div className="h-3 w-32 rounded bg-gray-700 animate-pulse" />
              </div>
            </div>
          </div>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0" inset={false}>
              <div className="flex items-center gap-3 px-2 py-3">
                <Avatar className="h-12 w-12 ring-2 ring-yellow-500/20">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/153423955?" />
                  <AvatarFallback className="bg-yellow-500 text-white text-lg font-semibold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-200 truncate">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {user?.email || ''}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator className="bg-gray-700/50 my-1" />
        
        <DropdownMenuItem
          onClick={() => router.push('/profile')}
          className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-300 rounded-lg hover:bg-gray-700/50 hover:text-white focus:bg-gray-700/50 focus:text-white transition-all duration-200 cursor-pointer"
          inset={false}
        >
          <User className="h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-700/50 my-1" />
        
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-300 rounded-lg hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10 focus:text-red-400 transition-all duration-200 cursor-pointer"
          inset={false}
        >
          <SignOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown