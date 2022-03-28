import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApplicationLayout,
  Feather,
} from '@blubberfish/frontend/ui/components';
import { Module } from '@blubberfish/frontend/modules/core';
import { HomeMenu } from './home-menu';
import slice, { openMenu, showMenuSelector } from './redux';
import { HomePageLayout } from './home-layout';
import { Form } from './form';

const HomePage = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector(showMenuSelector);
  const openMenuHandler = useCallback(() => {
    dispatch(openMenu());
  }, [dispatch]);

  return <HomePageLayout left={<Form />} />;
};

export default () => (
  <Module slice={slice}>
    <HomePage />
  </Module>
);
