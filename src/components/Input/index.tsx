import { memo } from 'react';
import { withEventWrapper } from '../../utils/withEventWrapper';
import { Input as _Input } from './Input';

export const InputSlug = 'Input';

export const Input = withEventWrapper({
  handlers: ['onClick', 'onChange', 'onKeyDown'],
  slug: InputSlug
})(memo(_Input))