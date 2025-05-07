import { createFileRoute } from '@tanstack/react-router'
import NewPost from "../pages/CreatePost.tsx";

export const Route = createFileRoute('/posts/new')({
  component:NewPost,

});