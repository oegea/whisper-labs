/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/6f6XGBuIXYJ
 */
import Link from "next/link"

export function Header() {
  return (
    (<header
      className="fixed top-0 left-0 w-full h-16 bg-[rgba(255,255,255,0.8)] backdrop-filter backdrop-blur-lg flex items-center justify-center z-10 animate-gradient-x opacity-90">
      <div
        className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 opacity-20 animate-pulse-header" />
      <nav className="container mx-auto flex items-center justify-center gap-8 z-10">
        <Link
          className="text-lg font-semibold text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
          href="/">
          Assistant
        </Link>
        <Link
          className="text-lg font-semibold text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
          href="/configuration">
          Configuration
        </Link>
      </nav>
    </header>)
  );
}
