'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar"

import { useRouter } from "next/navigation"

const UserDropdown = () => {
  const router = useRouter()

  const handleLogout = async () => {
    router.push("/sign-in")
  }

  const user = {
    name: "John Doe",
    email: "WY8G9@example.com",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:bg-gray-700 rounded-md px-3 py-2 transition-colors duration-200">
          <span className="text-sm font-medium">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="" />
              <AvatarFallback className="bg-yellow-500 text-white">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
          </span>
          
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="text-gray-400">
        <div className="flex relative items-center gap-3 py-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://avatars.githubusercontent.com/u/153423955?" />

            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-base font-medium text-gray-400">
              {user.name}
            </span>

            <span className="text-sm text-gray-500">
              {user.email}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-gray-600"/>
        <DropdownMenuItem onClick={handleLogout} className="text-gray-100 text-md font-medium focus:bg-transparent  focus:text-yellow-500 transition-colors cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown