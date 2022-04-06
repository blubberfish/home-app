import { Plus } from '@blubberfish/frontend/components/icons/font-awesome';
import { accountInfoSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import { DASHBOARD_FAMILY_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import {
  alignment,
  AlignmentProps,
  color,
  ColorProps,
  font,
  FontProps,
  grid,
  GridProps,
  indication,
  IndicationType,
  opacity,
  OpacityProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, generatePath } from 'react-router-dom';
import styled from 'styled-components';
import { PersonListSkeleton } from './components/person-list-skeleton';

const Container = styled.section<AlignmentProps & GridProps>`
  ${alignment}
  ${grid}
`;

const Title = styled.header<AlignmentProps & ColorProps & GridProps>`
  ${alignment}
  ${color}
  ${grid}
`;

const TitleText = styled.h1<FontProps>`
  margin: 0;
  ${font}
`;

type TitleButtonIndicationProps = {
  indication?: {
    [IndicationType.Hover]?: ColorProps & OpacityProps;
  };
};
const titleBtnIndication = indication<TitleButtonIndicationProps>(
  IndicationType.Hover,
  [
    ({ indication, theme }) =>
      opacity({ theme, ...indication?.[IndicationType.Hover] }),
    ({ indication, theme }) =>
      color({ theme, ...indication?.[IndicationType.Hover] }),
  ]
);
const TitleButton = styled.button<
  ColorProps & FontProps & RadiusProps & TitleButtonIndicationProps
  >`
  border: 0;
  border-radius: 0;
  margin: 0;
  outline: 0;
  background-color: transparent;
  color: currentColor;
  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
  ${color}
  ${font}
  ${radius}
  ${titleBtnIndication}
`;

export const OverviewChildrenList = () => {
  const account = useSelector(accountInfoSelector);
  const navigate = useNavigate();
  const handleRegister = useCallback(() => {
    navigate(generatePath(`../${DASHBOARD_FAMILY_PATH.ADD_CHILD}`));
  }, [navigate]);
  const handleViewDetails = useCallback(
    (uuid: string) => {
      navigate(generatePath(`../${DASHBOARD_FAMILY_PATH.CHILD}`, { id: uuid }));
    },
    [navigate]
  );

  return (
    <Container
      templateColumns="1fr"
      autoRows="min-content"
      autoFlow="row"
      gap={2}
    >
      <Title
        fg="text_weak"
        alignContent="center"
        templateColumns="1fr max-content"
        templateRows="min-content"
      >
        <TitleText ftSize={2}>Our children</TitleText>
        <TitleButton
          indication={{
            [IndicationType.Hover]: { opacity: 1, bg: 'background_weak' },
          }}
          onClick={handleRegister}
          rad={2}
          type="button"
        >
          <Plus />
        </TitleButton>
      </Title>
      <PersonListSkeleton
        data={account?.family.children}
        onClick={handleViewDetails}
      />
    </Container>
  );
};
