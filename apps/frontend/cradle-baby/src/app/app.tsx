import { ApplicationLayout } from './components/layout/application';
import { ConstrainedLayout } from './components/layout/constrained';

export function App() {
  return (
    <ApplicationLayout
      head={{
        right: <div>MENU</div>,
      }}
    >
      <ConstrainedLayout>
        <header>LOGIN</header>
        <section>TEST</section>
        <section>TEST</section>
      </ConstrainedLayout>
    </ApplicationLayout>
  );
}

export default App;
