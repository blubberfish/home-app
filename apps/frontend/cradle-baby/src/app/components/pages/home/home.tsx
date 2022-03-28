import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Module } from '@blubberfish/frontend/modules/core';
import slice, { openMenu, showMenuSelector } from './redux';
import { HomePageLayout } from './home-layout';
import { HomeLogo } from './home-logo';

const HomePage = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector(showMenuSelector);
  const openMenuHandler = useCallback(() => {
    dispatch(openMenu());
  }, [dispatch]);

  return <HomePageLayout left={<HomeLogo />} />;
};

export default () => (
  <Module slice={slice}>
    <HomePage />
  </Module>
);
