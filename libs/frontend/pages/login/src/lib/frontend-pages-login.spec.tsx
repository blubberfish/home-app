import { render } from '@testing-library/react';

import FrontendPagesLogin from './frontend-pages-login';

describe('FrontendPagesLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendPagesLogin />);
    expect(baseElement).toBeTruthy();
  });
});
