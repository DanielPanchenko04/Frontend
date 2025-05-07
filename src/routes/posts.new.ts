import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/new')({
  component: () => <div>Hello /posts/new!</div>
})