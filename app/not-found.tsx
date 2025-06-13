import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">404</h2>
      <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Page Not Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        The page youre looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Return Home
      </Link>
    </div>
  )
} 