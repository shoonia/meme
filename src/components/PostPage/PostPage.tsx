import { FC } from 'react';

import { Image } from '../Image';
import { usePost } from '../../hooks/usePost';
import { isUndefined } from '../../util';

export const PostPage: FC = () => {
  const post = usePost();

  const image = isUndefined(post) || (
    <Image {...post.image} />
  );

  return (
    <div>
      {image}
    </div>
  );
};
