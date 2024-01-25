import React from 'react';
import { ENewPostPageId, TNewPostPageProps } from './types';
import { Input } from '../../components/Input';

export const NewPostPage: React.FC<TNewPostPageProps> = ({
  input
}) => {
  return <Input placeholder='write your post' value={input} id={ENewPostPageId.PostId}/>
}