import {
  Mars,
  Venus,
} from '@blubberfish/frontend/components/icons/font-awesome';
import {
  accountIdSelector,
  genderColorsSelector,
  setAccountInfo,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import { addAccountChildren } from '@blubberfish/services/client';
import {
  alignment,
  AlignmentProps,
  border,
  BorderProps,
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
  responsive,
  ResponsiveProps,
} from '@blubberfish/style-system';
import { CreatePersonEntityPayload, Language } from '@blubberfish/types';
import { ChangeEvent, FormEvent, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  formSelector,
  pendingActionSelector,
  setDateTimeOfBirth,
  setGenderFemale,
  setGenderMale,
  setPreferredName,
  setFamilyName,
  setGivenName,
  setAlert,
  setPending,
  confirmPending,
  dismissAlert,
  dismissPending,
  alertSelector,
} from './redux';

type ButtonIndicationProps = {
  indication?: {
    [IndicationType.Hover]?: OpacityProps;
    [IndicationType.Disabled]?: OpacityProps;
  };
};
const buttonDisabledIndication = indication<InputIndicationProps>(
  IndicationType.Disabled,
  [
    ({ indication, theme }) =>
      opacity({ theme, ...indication?.[IndicationType.Focus] }),
  ]
);
const buttonHoverIndication = indication<InputIndicationProps>(
  IndicationType.Hover,
  [
    ({ indication, theme }) =>
      opacity({ theme, ...indication?.[IndicationType.Hover] }),
  ]
);
const Button = styled.button<
  ColorProps &
  BorderProps &
  FontProps &
  ButtonIndicationProps &
  PaddingProps &
  RadiusProps
  >`
  background-color: transparent;
  color: currentColor;
  border: 0;
  border-radius: 0;
  margin: 0;
  padding: 0;
  outline: 0;
  svg {
    fill: currentColor;
    height: 1em;
    wight: 1em;
  }
  ${border}
  ${color}
  ${font}
  ${padding}
  ${radius}
  ${buttonDisabledIndication}
  ${buttonHoverIndication}
`;

type InputIndicationProps = {
  indication?: {
    [IndicationType.Hover]?: OpacityProps;
    [IndicationType.Focus]?: BorderProps;
    [IndicationType.Disabled]?: OpacityProps;
  };
};
const inputDisabledIndication = indication<InputIndicationProps>(
  IndicationType.Disabled,
  [
    ({ indication, theme }) =>
      opacity({ theme, ...indication?.[IndicationType.Focus] }),
  ]
);
const inputFocusIndication = indication<InputIndicationProps>(
  IndicationType.Focus,
  [
    ({ indication, theme }) =>
      border({ theme, ...indication?.[IndicationType.Focus] }),
  ]
);
const inputHoverIndication = indication<InputIndicationProps>(
  IndicationType.Hover,
  [
    ({ indication, theme }) =>
      opacity({ theme, ...indication?.[IndicationType.Hover] }),
  ]
);
const Input = styled.input<BorderProps & InputIndicationProps & PaddingProps>`
  background-color: transparent;
  color: currentColor;
  border: 0;
  border-radius: 0;
  margin: 0;
  padding: 0;
  outline: 0;
  ${border}
  ${padding}
  ${inputDisabledIndication}
  ${inputFocusIndication}
  ${inputHoverIndication}
`;

const responsiveSection = responsive<GridProps>(grid);
const Section = styled.section<
  AlignmentProps &
  ColorProps &
  GridProps &
  PaddingProps &
  RadiusProps &
  ResponsiveProps<GridProps>
  >`
  ${alignment}
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${responsiveSection}
`;

const Form = styled.form<GridProps>`
  ${grid}
`;

const Heading = styled.h1<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;

const SubHeading = styled.h2<FontProps>`
  margin: 0;
  ${font}
`;

export const AddChildForm = () => {
  const dispatch = useDispatch();
  const account = useSelector(accountIdSelector);
  const form = useSelector(formSelector);
  const pronoun = useMemo(
    () => (!form?.gender ? 'my child`s' : form.gender === 'm' ? 'his' : 'her'),
    [form]
  );
  const colors = useSelector(genderColorsSelector);
  const alert = useSelector(alertSelector);
  const pending = useSelector(pendingActionSelector);
  const handleChangeDToB = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault();
      dispatch(setDateTimeOfBirth(ev.target.value));
    },
    [dispatch]
  );
  const handleChangeEnPreferred = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault();
      dispatch(
        setPreferredName({ language: Language.English, value: ev.target.value })
      );
    },
    [dispatch]
  );
  const handleChangeEnFamily = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault();
      dispatch(
        setFamilyName({ language: Language.English, value: ev.target.value })
      );
    },
    [dispatch]
  );
  const handleChangeEnGiven = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault();
      dispatch(
        setGivenName({ language: Language.English, value: ev.target.value })
      );
    },
    [dispatch]
  );
  const handleChangeZhPreferred = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault();
      dispatch(
        setPreferredName({ language: Language.Chinese, value: ev.target.value })
      );
    },
    [dispatch]
  );
  const handleChangeZhFamily = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault();
      dispatch(
        setFamilyName({ language: Language.Chinese, value: ev.target.value })
      );
    },
    [dispatch]
  );
  const handleChangeZhGiven = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault();
      dispatch(
        setGivenName({ language: Language.Chinese, value: ev.target.value })
      );
    },
    [dispatch]
  );
  const handleChangeMale = useCallback(() => {
    dispatch(setGenderMale());
  }, [dispatch]);
  const handleChangeFemale = useCallback(() => {
    dispatch(setGenderFemale());
  }, [dispatch]);
  const handleSubmit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      if (!account) return;
      if (
        !(
          form?.dtob &&
          form.gender &&
          form.name?.en?.family &&
          form.name.en.given &&
          form.name.zh?.family &&
          form.name.zh?.given
        )
      ) {
        dispatch(
          setAlert({
            title: 'Incomplete form',
            message: 'Please provide all necessary information.',
          })
        );
        return;
      }
      if (pending) {
        pending.action();
        return;
      }
      dispatch(
        setPending({
          id: 'add.child',
          action: () => {
            dispatch(dismissAlert());
            dispatch(confirmPending());
            return addAccountChildren({
              account,
              data: [form as CreatePersonEntityPayload],
            })
              .then(
                (updatedInfo) => {
                  updatedInfo && dispatch(setAccountInfo(updatedInfo));
                  dispatch(
                    setAlert({
                      type: 'success',
                      title: 'Success',
                      message: 'Your child has been added to your family.',
                    })
                  );
                },
                (e) => {
                  dispatch(
                    setAlert({
                      title: 'Something went wrong',
                      message: e.message,
                    })
                  );
                }
              )
              .finally(() => {
                dispatch(dismissPending());
              });
          },
        })
      );
    },
    [account, dispatch, form, pending]
  );

  if (alert?.type === 'success') return null;
  return (
    <Form
      onSubmit={handleSubmit}
      templateColumns="1fr"
      autoRows="min-content"
      autoFlow="row"
      gap={3}
    >
      <Heading fg="text_weak" ftSize={3} ftWeight={1}>
        Add child to our family
      </Heading>
      <Section bg="background_weak" gap={2} pad={2} rad={2}>
        <SubHeading ftSize={2} ftWeight={1}>
          My child is a
        </SubHeading>
        <Section
          templateRows="min-content"
          autoColumns="max-content"
          autoFlow="column"
          justifyContent="center"
          justifyItems="center"
          gap={2}
        >
          <Button
            disabled={!!pending}
            fg={
              form?.gender && form.gender === 'm'
                ? colors[form.gender]
                : undefined
            }
            ftSize={3}
            indication={{
              [IndicationType.Disabled]: {
                opacity: 1,
              },
              [IndicationType.Hover]: {
                opacity: 2,
              },
            }}
            onClick={handleChangeMale}
            type="button"
          >
            <Mars />
          </Button>
          <Button
            disabled={!!pending}
            fg={
              form?.gender && form.gender === 'f'
                ? colors[form.gender]
                : undefined
            }
            ftSize={3}
            indication={{
              [IndicationType.Disabled]: {
                opacity: 1,
              },
              [IndicationType.Hover]: {
                opacity: 2,
              },
            }}
            onClick={handleChangeFemale}
            type="button"
          >
            <Venus />
          </Button>
        </Section>
      </Section>
      {form?.gender && (
        <Section bg="background_weak" gap={2} pad={2} rad={2}>
          <SubHeading ftSize={2} ftWeight={1}>
            and is borned on
          </SubHeading>
          <Input
            bdrB={{ size: 1, color: 'background' }}
            disabled={!!pending}
            indication={{
              [IndicationType.Disabled]: {
                opacity: 1,
              },
              [IndicationType.Focus]: {
                bdrB: {
                  size: 1,
                  color: 'currentColor',
                },
              },
              [IndicationType.Hover]: {
                opacity: 2,
              },
            }}
            name="dtob"
            onChange={handleChangeDToB}
            padX={3}
            padY={2}
            type="datetime-local"
            value={form?.dtob ?? ''}
          />
        </Section>
      )}
      {form?.dtob && (
        <Section bg="background_weak" gap={2} pad={2} rad={2}>
          <SubHeading ftSize={2} ftWeight={1}>
            and {pronoun} name is
          </SubHeading>
          <Section
            responsive={[
              {
                templateColumns: '1fr',
                autoRows: 'min-content',
                autoFlow: 'row',
              },
              {
                templateColumns: 'repeat(3, 1fr)',
                templateRows: 'repeat(2, min-content)',
              },
            ]}
            gap={2}
          >
            <Input
              bdrB={{ size: 1, color: 'background' }}
              disabled={!!pending}
              indication={{
                [IndicationType.Disabled]: {
                  opacity: 1,
                },
                [IndicationType.Focus]: {
                  bdrB: {
                    size: 1,
                    color: 'currentColor',
                  },
                },
                [IndicationType.Hover]: {
                  opacity: 2,
                },
              }}
              name="enFamily"
              onChange={handleChangeEnFamily}
              placeholder="English family name"
              padX={3}
              padY={2}
              type="text"
              value={form?.name?.en?.family ?? ''}
            />
            <Input
              bdrB={{ size: 1, color: 'background' }}
              disabled={!!pending}
              indication={{
                [IndicationType.Disabled]: {
                  opacity: 1,
                },
                [IndicationType.Focus]: {
                  bdrB: {
                    size: 1,
                    color: 'currentColor',
                  },
                },
                [IndicationType.Hover]: {
                  opacity: 2,
                },
              }}
              name="enGiven"
              onChange={handleChangeEnGiven}
              placeholder="English given name"
              padX={3}
              padY={2}
              type="text"
              value={form?.name?.en?.given ?? ''}
            />
            <Input
              bdrB={{ size: 1, color: 'background' }}
              disabled={!!pending}
              indication={{
                [IndicationType.Disabled]: {
                  opacity: 1,
                },
                [IndicationType.Focus]: {
                  bdrB: {
                    size: 1,
                    color: 'currentColor',
                  },
                },
                [IndicationType.Hover]: {
                  opacity: 2,
                },
              }}
              name="enPreferred"
              onChange={handleChangeEnPreferred}
              placeholder="English preferred name"
              padX={3}
              padY={2}
              type="text"
              value={form?.name?.en?.preferred ?? ''}
            />
            <Input
              bdrB={{ size: 1, color: 'background' }}
              disabled={!!pending}
              indication={{
                [IndicationType.Disabled]: {
                  opacity: 1,
                },
                [IndicationType.Focus]: {
                  bdrB: {
                    size: 1,
                    color: 'currentColor',
                  },
                },
                [IndicationType.Hover]: {
                  opacity: 2,
                },
              }}
              name="zhFamily"
              onChange={handleChangeZhFamily}
              placeholder="Chinese family name"
              padX={3}
              padY={2}
              type="text"
              value={form?.name?.zh?.family ?? ''}
            />
            <Input
              bdrB={{ size: 1, color: 'background' }}
              disabled={!!pending}
              indication={{
                [IndicationType.Disabled]: {
                  opacity: 1,
                },
                [IndicationType.Focus]: {
                  bdrB: {
                    size: 1,
                    color: 'currentColor',
                  },
                },
                [IndicationType.Hover]: {
                  opacity: 2,
                },
              }}
              name="zhGiven"
              onChange={handleChangeZhGiven}
              placeholder="Chinese given name"
              padX={3}
              padY={2}
              type="text"
              value={form?.name?.zh?.given ?? ''}
            />
            <Input
              bdrB={{ size: 1, color: 'background' }}
              disabled={!!pending}
              indication={{
                [IndicationType.Disabled]: {
                  opacity: 1,
                },
                [IndicationType.Focus]: {
                  bdrB: {
                    size: 1,
                    color: 'currentColor',
                  },
                },
                [IndicationType.Hover]: {
                  opacity: 2,
                },
              }}
              name="zhPreferred"
              onChange={handleChangeZhPreferred}
              placeholder="Chinese preferred name"
              padX={3}
              padY={2}
              type="text"
              value={form?.name?.zh?.preferred ?? ''}
            />
          </Section>
        </Section>
      )}
      <Button
        bg={pending ? 'success' : 'text'}
        disabled={pending?.started}
        fg={pending ? 'text' : 'background'}
        indication={{
          [IndicationType.Disabled]: {
            opacity: 1,
          },
          [IndicationType.Hover]: {
            opacity: 2,
          },
        }}
        padX={3}
        padY={2}
        rad={2}
        type="submit"
      >
        {pending ? 'Confirm?' : 'Submit'}
      </Button>
    </Form>
  );
};
