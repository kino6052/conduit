import { Link } from "../../../components/Link/Link";
import { IEvent } from "../../../utils/events";
import { TPageDefaultProps } from '../PageDefault';

export const logic = async (event: IEvent, state: TPageDefaultProps): Promise<TPageDefaultProps> => {
  if (event.slug === Link.name) {
    return {
      ...state,
      banner: {
        ...state.banner,
        heading: event.id
      }
    }
  }
  
  return state;
}