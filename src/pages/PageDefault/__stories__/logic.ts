import { Button } from "../../../components/Button/Button";
import { Link } from "../../../components/Link/Link";
import { IEvent } from "../../../utils/events";
import { TPageDefaultProps } from '../PageDefault';

export const logic = async (event: IEvent, state: TPageDefaultProps): Promise<TPageDefaultProps> => {
  console.warn(state)
  if (event.slug === Link.name) {
    return {
      ...state,
      banner: {
        ...state.banner,
        heading: event.id
      }
    }
  }

  if (event.slug === Button.name) {
    return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id !== event.id) return post;

        return {
          ...post,
          likes: post.likes + 1
        }
      })
    }
  }
  
  return state;
}