import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link
          href="/"
          className="text-3xl font-bold text-gray-100 auth-logo"
        >
          <Image
            src="/public/assets/icons/star.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>

        <section className="auth-left-content">
          <div className="pb-6 lg:pb-8 flex-1">{children}</div>
        </section>

        <blockquote className="auth-blockquote">
          Info
        </blockquote>

        <div className="flex items-center justify-between">
          <div>
            <cite className="auth-testimonial-author">- Atif Ali.</cite>
            <p className="max-md:text-xs text-gray-500">CEO</p>
          </div>

          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                key={star}
                src="/assets/icons/star.svg"
                alt="Star"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 relative">
          <Image
            src="/assets/images/image.png"
            alt="Dashboard Preview"
            width={1440}
            height={1150}
            className="auth-dashboard-preview absolute top-0"
          />
        </div>
      </section>
    </main>
  )
}

export default Layout