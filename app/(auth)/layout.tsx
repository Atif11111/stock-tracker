import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-yellow-500/5 pointer-events-none" />
      
      <div className="absolute top-10 left-10 hidden lg:block">
        <Link href="/">
          <Image
            src="/assets/icons/image.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 lg:hidden">
        <Link href="/">
          <Image
            src="/assets/icons/image.png"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/20 p-6 sm:p-8">
          {children}
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                key={star}
                src="/assets/icons/star.svg"
                alt="Star"
                width={16}
                height={16}
                className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
          <blockquote className="text-sm text-gray-500 italic mb-1">
            "The best stock tracking platform I've ever used"
          </blockquote>
          <cite className="text-xs text-gray-600 not-italic">Atif Ali — CEO</cite>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-800/20 to-transparent pointer-events-none" />
    </main>
  );
}

export default Layout