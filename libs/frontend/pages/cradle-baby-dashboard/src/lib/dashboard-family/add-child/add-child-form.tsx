import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  FontAwesome,
  Input,
} from '@blubberfish/frontend/ui/components';
import {
  alignment,
  AlignmentProps,
  border,
  BorderProps,
  color,
  ColorProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { addAccountChildren } from '@blubberfish/services/client';

const Container = styled.div<AlignmentProps & GridProps & PaddingProps>`
  ${alignment}
  ${grid}
  ${padding}
`;

const FormContainer = styled(Container) <BorderProps & ColorProps & RadiusProps>`
  ${border}
  ${color}
  ${radius}
`;

export const AddChildForm = () => {
  const [pending, setPending] = useState(false);
  const [enFamilyName, setEnFamilyName] = useState('');
  const [enGivenName, setEnGivenName] = useState('');
  const [zhFamilyName, setZhFamilyName] = useState('');
  const [zhGivenName, setZhGivenName] = useState('');
  const [dtob, setDtob] = useState<Date>();
  const [gender, setGender] = useState<'m' | 'f'>();
  const [pronoun, pronounProcessive] = useMemo(() => {
    if (gender === 'm') {
      return ['He', 'his'];
    }
    if (gender === 'f') {
      return ['She', 'her'];
    }
    return ['My child', "my child's"];
  }, [gender]);

  const handleSubmit = useCallback(() => {
    /** @todo alert message */
    if (
      !(
        dtob &&
        gender &&
        enFamilyName &&
        enGivenName &&
        zhFamilyName &&
        zhGivenName
      )
    )
      return;

    setPending(true);
    addAccountChildren([
      {
        dtob: dtob.toISOString(),
        gender,
        name: {
          en: {
            family: enFamilyName,
            given: enGivenName,
          },
          zh: {
            family: zhFamilyName,
            given: zhGivenName,
          },
        },
      },
    ]).then(
      () => {
        /** @todo */
      },
      () => {
        /** @todo alert message */
        setPending(false);
      }
    );
  }, [dtob, enFamilyName, enGivenName, gender, zhFamilyName, zhGivenName]);

  return (
    <Container
      pad={3}
      templateColumns="1fr"
      autoRows="min-content"
      autoFlow="row"
    >
      <FormContainer
        bg="background_weak"
        rad={3}
        pad={5}
        gap={3}
        templateColumns="1fr"
        autoRows="min-content"
        autoFlow="row"
      >
        <Container
          alignContent="center"
          justifyContent="center"
          templateColumns="max-content"
          templateRows="repeat(2, min-content)"
          gap={3}
        >
          <span>My child is a</span>
          <Container
            alignContent="center"
            justifyContent="center"
            templateColumns="repeat(2, max-content)"
            templateRows="min-content"
            gap={3}
          >
            <Button
              disabled={pending}
              fg={gender === 'f' ? 'success' : 'currentColor'}
              ftSize={3}
              simple
              type="button"
              onClick={() => {
                setGender('f');
              }}
            >
              <FontAwesome.Venus />
            </Button>
            <Button
              disabled={pending}
              fg={gender === 'm' ? 'success' : 'currentColor'}
              ftSize={3}
              simple
              type="button"
              onClick={() => {
                setGender('m');
              }}
            >
              <FontAwesome.Mars />
            </Button>
          </Container>
        </Container>
        {gender && (
          <Container
            gap={3}
            justifyContent="center"
            justifyItems="center"
            templateColumns="1fr"
            templateRows="repeat(2, min-content)"
          >
            <span>{pronoun} was born on</span>
            <Input
              disabled={pending}
              type="datetime-local"
              onChange={(ev) => {
                const value = ev.target.value;
                if (value) setDtob(new Date(value));
                else setDtob(() => undefined);
              }}
            />
          </Container>
        )}
        {dtob && (
          <Container
            justifyContent="center"
            justifyItems="center"
            templateColumns="1fr"
            autoRows="min-content"
            autoFlow="dense"
            gap={3}
          >
            <span>And {pronounProcessive} name is</span>
            <Container
              templateColumns="max-content 1fr"
              autoRows="min-content"
              autoFlow="dense"
              gap={3}
            >
              <Input
                disabled={pending}
                placeholder="Family name (English)"
                onChange={(ev) => {
                  setEnFamilyName(ev.target.value);
                }}
                value={enFamilyName}
              />
              <Input
                disabled={pending}
                placeholder="Given name (English)"
                onChange={(ev) => {
                  setEnGivenName(ev.target.value);
                }}
                value={enGivenName}
              />
              <Input
                disabled={pending}
                placeholder="Family name (Chinese)"
                onChange={(ev) => {
                  setZhFamilyName(ev.target.value);
                }}
                value={zhFamilyName}
              />
              <Input
                disabled={pending}
                placeholder="Given name (Chinese)"
                onChange={(ev) => {
                  setZhGivenName(ev.target.value);
                }}
                value={zhGivenName}
              />
            </Container>
          </Container>
        )}
        {enFamilyName && enGivenName && zhFamilyName && zhGivenName && (
          <Button
            disabled={pending}
            label="Submit"
            type="button"
            onClick={handleSubmit}
          />
        )}
      </FormContainer>
    </Container>
  );
};
