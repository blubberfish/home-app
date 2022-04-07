import {
  Mars,
  Venus,
} from '@blubberfish/frontend/components/icons/font-awesome';
import { accountInfoSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
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
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { genderColorsSelector } from './redux';

const P = styled.p<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;

const Container = styled.div<GridProps>`
  ${grid}
`;

const TableCellContainer = styled.div<
  AlignmentProps & ColorProps & GridProps & PaddingProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${padding}
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
  dob: Date;
  gender: 'm' | 'f';
  enName: string;
  enAlias?: string;
  zhName: string;
  zhAlias?: string;
};
const Row = ({
  onClick,
  dob,
  gender,
  enName,
  zhName,
  enAlias,
  zhAlias,
}: RowProps) => {
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
      justifyItems="center"
      templateRows="min-content"
      templateColumns="repeat(2, max-content) repeat(2, 1fr)"
      autoFlow="column"
      bg="background_weak"
      gap={3}
      padX={3}
      padY={2}
      rad={2}
    >
      <TableCellContainer alignItems="center" alignContent="center">
        {gender === 'f' ? <Venus {...svgProps} /> : <Mars {...svgProps} />}
      </TableCellContainer>
      <TableCellContainer alignItems="center" alignContent="center">
        {moment(dob).format('DD MMM YYYY')}
      </TableCellContainer>
      <TableCellContainer
        templateColumns="max-content"
        autoRows="min-content"
        autoFlow="row"
        alignItems="center"
        alignContent="center"
        gap={1}
      >
        <P>{enName}</P>
        {enAlias && (
          <P fg="text_weak" ftSize={1}>
            {enAlias}
          </P>
        )}
      </TableCellContainer>
      <TableCellContainer
        alignItems="center"
        alignContent="center"
        templateColumns="max-content"
        autoRows="min-content"
        autoFlow="row"
        gap={1}
      >
        <P>{zhName}</P>
        {zhAlias && (
          <P fg="text_weak" ftSize={1}>
            {zhAlias}
          </P>
        )}
      </TableCellContainer>
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
            dob={child.dtob}
            gender={child.gender}
            enAlias={child.name.en?.preferred}
            enName={`${[child.name.en?.family, child.name.en?.given]
              .filter((x) => !!x)
              .join(' ')}`}
            zhAlias={child.name.zh?.preferred}
            zhName={`${[child.name.zh?.family, child.name.zh?.given]
              .filter((x) => !!x)
              .join('')}`}
            onClick={() => {
              navigate(child.uuid);
            }}
          />
        ))}
      </Container>
    </Container>
  );
};

export default ChildrenTablePage;
