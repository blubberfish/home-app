import { useState } from 'react';
import styled from 'styled-components';
import {
  alignment,
  AlignmentProps,
  backgroundImage,
  BackgroundImageProps,
  border,
  BorderProps,
  color,
  ColorProps,
  grid,
  GridProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { NewUserButton } from './new-user-button';

const Decoration = styled.div<BackgroundImageProps & ColorProps & PaddingProps>`
  ${backgroundImage}
  ${color}
  ${padding}
`;

const Form = styled.form<
  AlignmentProps &
  BorderProps &
  ColorProps &
  GridProps &
  MarginProps &
  PaddingProps &
  SizeProps
  >`
  ${alignment}
  ${border}
  ${color}
  ${grid}
  ${margin}
  ${padding}
  ${size}
`;

export const NewUserForm = () => {
  const [display, setDisplay] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Form
      overflow="hidden"
      templateColumns="1fr"
      autoRows="min-content"
      autoFlow="row"
    >
      <Decoration padT={3} bgImg="gradient_scales" bgSize="48px 24px" />
      <input
        name="username"
        placeholder=""
        value={username}
        onChange={(ev) => {
          setUsername(ev.target.value.trim());
        }}
      />
      <input
        name="password"
        placeholder=""
        value={password}
        onChange={(ev) => {
          setPassword(ev.target.value.trim());
        }}
        type="password"
      />
      <input
        name="accountName"
        placeholder=""
        value={display}
        onChange={(ev) => {
          setDisplay(ev.target.value.trim());
        }}
      />
      <NewUserButton label="Create" />
    </Form>
  );
};
