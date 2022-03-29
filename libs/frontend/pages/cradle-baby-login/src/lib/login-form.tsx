import { useState } from 'react';
import styled from 'styled-components';
import {
  alignment,
  AlignmentProps,
  backgroundImage,
  BackgroundImageProps,
  color,
  ColorProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { Button, Input } from '@blubberfish/frontend/ui/components';

const Container = styled.div<
  AlignmentProps &
    BackgroundImageProps &
    ColorProps &
    GridProps &
    PaddingProps &
    RadiusProps &
    SizeProps
>`
  ${alignment}
  ${backgroundImage}
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${size}

  hr {
    width: 100%;
  }
`;

const ElevatedContainer = styled(Container)`
  filter: drop-shadow(0 3px 3px #0003);
`;

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ElevatedContainer bg="background_invert_strong" rad={2} overflow="hidden">
      <Container
        bgImg="gradient_scales"
        bgSize="50px 25px"
        padT={5}
        bg="background_invert_strong"
      />
      <Container pad={5} gap={3}>
        <Input
          invert
          name="username"
          onChange={(ev) => {
            setUsername(ev.target.value.trim());
          }}
          placeholder="Username"
          value={username}
        />
        <Input
          invert
          onChange={(ev) => {
            setPassword(ev.target.value.trim());
          }}
          placeholder="Password"
          value={password}
          type="password"
        />
        <Button label="Sign in" />
      </Container>
    </ElevatedContainer>
  );
};
