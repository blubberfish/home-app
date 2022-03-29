import { FormEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { Button, Input } from '@blubberfish/frontend/ui/components';
import { createAccount } from '@blubberfish/services/client';
import { setAlert } from './redux';

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

const Container = styled.div<
  AlignmentProps &
    BorderProps &
    ColorProps &
    GridProps &
    MarginProps &
    PaddingProps &
    RadiusProps &
    SizeProps
>`
  ${alignment}
  ${border}
  ${color}
  ${grid}
  ${margin}
  ${padding}
  ${radius}
  ${size}

  filter: drop-shadow(0 5px 5px #0003);
`;

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const handleSubmit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const data = new FormData(ev.currentTarget);
      const displayName = data.get('displayName')?.toString().trim();
      const password = data.get('password')?.toString().trim();
      const confirm = data.get('password_confirm')?.toString().trim();
      const username = data.get('username')?.toString().trim();

      if (displayName && username && password && confirm) {
        if (password !== confirm) {
          dispatch(
            setAlert({
              title: 'Please try again',
              message: 'Your password does not match.',
            })
          );
          return;
        }

        dispatch(setAlert(null));
        setPending(true);
        createAccount({ displayName, password, username })
          .then(
            () => {
              // TODO
            },
            (error) => {
              dispatch(
                setAlert(
                  error.message === 'api.error_409'
                    ? {
                        title: 'This account already exist',
                        message: 'Try a different username.',
                      }
                    : {
                        title: 'Something went wrong',
                        message: `An unknown error has occured ${error.message}.`,
                      }
                )
              );
            }
          )
          .finally(() => {
            setPending(false);
          });
      }
    },
    [dispatch]
  );

  return (
    <Container
      bg="background_invert_strong"
      overflow="hidden"
      templateColumns="1fr"
      autoRows="min-content"
      autoFlow="row"
      rad={3}
      bdr={{ size: 1, color: 'background_invert_weak' }}
    >
      <Decoration pad={3} bgImg="gradient_scales" bgSize="48px 24px" />
      <Form gap={3} pad={5} onSubmit={handleSubmit}>
        <Input
          invert
          required
          disabled={pending}
          name="username"
          placeholder="Username"
        />
        <Input
          invert
          required
          disabled={pending}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Input
          invert
          required
          disabled={pending}
          name="password_confirm"
          placeholder="Confirm password"
          type="password"
        />
        <Input
          invert
          required
          disabled={pending}
          name="displayName"
          placeholder="Account name"
        />
        <Button disabled={pending} label="Submit" type="submit" />
      </Form>
    </Container>
  );
};
