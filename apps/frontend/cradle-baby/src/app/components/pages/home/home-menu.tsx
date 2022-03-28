import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { OverlayLayout, Feather } from '@blubberfish/frontend/ui/components';
import {
  ColorProps,
  color,
  PaddingProps,
  padding,
} from '@blubberfish/style-system';
import { PATH } from '@blubberfish/frontend/pages/routes';
import { closeMenu, showMenuSelector } from './redux';

const Container = styled.div<ColorProps & PaddingProps>`
  ${color}
  ${padding}
`;

export const HomeMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handle = useMemo(
    () => ({
      closeMenu: () => {
        dispatch(closeMenu());
      },
      goRegister: () => {
        navigate(PATH.PUBLIC.NEW_USER);
      },
      goLogin: () => {
        navigate(PATH.PUBLIC.LOGIN);
      },
    }),
    [dispatch, navigate]
  );
  return (
    <OverlayLayout onClickOutside={handle.closeMenu}>
      <Container pad={3} bg="background_strong">
        <button onClick={handle.goLogin}>Sign In</button>
        <button onClick={handle.goRegister}>Register</button>
        <button onClick={handle.closeMenu}>
          <Feather.X />
        </button>
      </Container>
    </OverlayLayout>
  );
};
