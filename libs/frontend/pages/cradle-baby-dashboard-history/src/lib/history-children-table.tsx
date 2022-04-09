import {
  Mars,
  Venus,
} from '@blubberfish/frontend/components/icons/font-awesome';
import {
  accountInfoSelector,
  genderColorsSelector,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  DASHBOARD_HISTORY_PATH,
  DASHBOARD_PATH,
  PATH,
} from '@blubberfish/frontend/pages/cradle-baby-routes';
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
  padding,
  PaddingProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const P = styled.p<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;

const Container = styled.div<GridProps>`
  ${grid}
`;

type RowIndicationProps = {
  indication?: {
    [IndicationType.Hover]?: OpacityProps;
  };
};
const rowIndication = indication<RowIndicationProps>(IndicationType.Hover, [
  ({ indication, theme }) =>
    opacity({ theme, ...indication?.[IndicationType.Hover] }),
]);
const TableRowContainer = styled.div<
  AlignmentProps &
  ColorProps &
  GridProps &
  PaddingProps &
  RadiusProps &
  RowIndicationProps
  >`
  cursor: pointer;
  ${alignment}
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${rowIndication}
`;

type RowProps = {
  onClick?: () => void;
  gender: 'm' | 'f';
  enName: string;
  zhName: string;
};
const Row = ({ onClick, gender, enName, zhName }: RowProps) => {
  const colors = useSelector(genderColorsSelector);
  const svgProps = {
    fill: colors[gender],
    height: '1em',
    width: '1em',
  };
  return (
    <TableRowContainer
      onClick={onClick}
      indication={{
        [IndicationType.Hover]: {
          opacity: 2,
        },
      }}
      alignContent="center"
      alignItems="center"
      justifyItems="center"
      templateRows="min-content"
      templateColumns="repeat(3, max-content)"
      autoFlow="column"
      bg="background_weak"
      gap={3}
      padX={3}
      padY={2}
      rad={2}
    >
      {gender === 'f' ? <Venus {...svgProps} /> : <Mars {...svgProps} />}
      <P>{enName}</P>
      <P>{zhName}</P>
    </TableRowContainer>
  );
};

const ChildrenTablePage = () => {
  const navigate = useNavigate();
  const account = useSelector(accountInfoSelector);

  if (!account) return null;

  const children = account.family.children;

  return (
    <Container
      templateColumns="1fr"
      autoRows="max-content"
      autoFlow="row"
      gap={3}
    >
      <P fg="text_weak">Select a child to view their past activities</P>
      <Container
        templateColumns="1fr"
        autoRows="max-content"
        autoFlow="row"
        gap={2}
      >
        {children.map((child) => (
          <Row
            key={child.uuid}
            gender={child.gender}
            /** @todo proper handling of empty string */
            enName={child.name.en?.preferred ?? child.name.en?.given ?? ''}
            zhName={child.name.zh?.preferred ?? child.name.zh?.given ?? ''}
            onClick={() => {
              navigate(
                generatePath(`../${DASHBOARD_HISTORY_PATH.LOG}`, {
                  uuid: child.uuid,
                })
              );
            }}
          />
        ))}
        {children.length === 0 && (
          <TableRowContainer
            bg="background_weak"
            indication={{
              [IndicationType.Hover]: {
                opacity: 2,
              },
            }}
            justifyItems="center"
            onClick={() => {
              navigate(`/${PATH.DASHBOARD}/${DASHBOARD_PATH.FAMILY}`);
            }}
            padX={3}
            padY={2}
            rad={2}
          >
            <span>Add a child to your family first</span>
          </TableRowContainer>
        )}
      </Container>
    </Container>
  );
};

export default ChildrenTablePage;
