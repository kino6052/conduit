import React from 'react';
import { Input } from '../../components/Input';
import { TPageProps } from '../types';
import { ENewPostPageId } from './types';

export const NewPostPage: React.FC<TPageProps> = ({
  input
}) => {
  return <Input placeholder='write your post' value={input} id={ENewPostPageId.PostId}/>
}