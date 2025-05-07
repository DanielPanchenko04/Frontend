import { createFileRoute } from '@tanstack/react-router';
import PostDetails from '../../pages/PostDetails.tsx';

export const Route = createFileRoute('/posts/$id')({
  component: PostDetails,
});
