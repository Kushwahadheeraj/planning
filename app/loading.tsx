export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-pulse rounded-full bg-blue-500/20"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
} 