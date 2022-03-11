import { render } from '@testing-library/react';

import FrontendPagesLanding from './frontend-pages-landing';

describe('FrontendPagesLanding', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendPagesLanding />);
    expect(baseElement).toBeTruthy();
  });
});
