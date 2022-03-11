import { Slice } from '@reduxjs/toolkit';

export type ModuleReducerMap = { [key: Slice['name']]: Slice['reducer'] };
