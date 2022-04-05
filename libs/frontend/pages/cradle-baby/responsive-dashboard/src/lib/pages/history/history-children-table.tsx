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
  grid,
  GridProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import moment from 'moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { genderColorsSelector } from './redux';

const P = styled.p`
  margin: 0;
`;

const TableContainer = styled.div<GridProps>`
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

const TableRowContainer = styled.div<
  AlignmentProps & ColorProps & GridProps & PaddingProps & RadiusProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${padding}
  ${radius}
`;

type RowProps = {
  dob: Date;
  gender: 'm' | 'f';
  enName: string;
  enAlias?: string;
  zhName: string;
  zhAlias?: string;
};
const Row = ({ dob, gender, enName, zhName, enAlias, zhAlias }: RowProps) => {
  const colors = useSelector(genderColorsSelector);
  const svgProps = {
    fill: colors[gender],
    height: '1em',
    width: '1em',
  };
  return (
    <TableRowContainer
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
        {moment(dob).format('YYYY MMM, DD')}
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
        {enAlias && <P>{enAlias}</P>}
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
        {zhAlias && <P>{zhAlias}</P>}
      </TableCellContainer>
    </TableRowContainer>
  );
};

export const ChildrenTable = () => {
  const account = useSelector(accountInfoSelector);
  if (!account) return null;

  const children = account.family.children;

  return (
    <TableContainer
      templateColumns="1fr"
      autoRows="max-content"
      autoFlow="row"
      gap={3}
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
            .join(' ')}`}
        />
      ))}
    </TableContainer>
  );
};
