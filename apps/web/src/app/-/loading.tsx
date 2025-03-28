import { LoaderCircle } from 'lucide-react'

export default function Loading() {
  return (
    <div className="h-full flex items-center justify-center">
      <LoaderCircle className="w-30 h-30 animate-spin" />
    </div>
  )
}
