import { FormEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setAccountId } from '@blubberfish/frontend/modules/cradle-baby/app';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { Button, Input } from '@blubberfish/frontend/ui/components';
import { login } from '@blubberfish/services/client';
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
import { setAlert } from './redux';

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

const Form = styled.form<GridProps & PaddingProps>`
  ${grid}
  ${padding}
`;

const ElevatedContainer = styled(Container)`
  filter: drop-shadow(0 3px 3px #0003);
`;

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const loginHandler = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const data = new FormData(ev.currentTarget);
      const username = data.get('username')?.toString().trim();
      const password = data.get('password')?.toString().trim();
      if (!(username && password)) {
        dispatch(
          setAlert({
            title: 'Missing credentials',
            message: 'You need to provide your username and password.',
          })
        );
        return;
      }
      setPending(true);
      dispatch(setAlert(null));
      login({
        username,
        password,
      }).then(
        (accountId) => {
          if (accountId) {
            dispatch(setAccountId(accountId));
            navigate(PATH.DASHBOARD);
          } else {
            setPending(false);
            dispatch(
              setAlert({
                title: 'Something went wrong',
                message: 'Sorry please try again.',
              })
            );
          }
        },
        (error) => {
          dispatch(
            setAlert({
              title: 'Unable to login',
              message:
                'Your username and/or password does not match any accounts.',
            })
          );
          setPending(false);
        }
      );
    },
    [dispatch, navigate]
  );

  return (
    <ElevatedContainer bg="background_invert_strong" rad={2} overflow="hidden">
      <Container
        bgImg="gradient_scales"
        bgSize="50px 25px"
        padT={5}
        bg="background_invert_strong"
      />
      <Form pad={5} gap={3} onSubmit={loginHandler}>
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
        <Button disabled={pending} label="Sign in" type="submit" />
      </Form>
    </ElevatedContainer>
  );
};
