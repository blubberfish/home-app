import { accountInfoSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import { useSelector } from 'react-redux';

type RowProps = {
  enName: string;
  enAlias?: string;
  zhName: string;
  zhAlias?: string;
};
const Row = ({ enName, zhName, enAlias, zhAlias }: RowProps) => (
  <>
    <div>
      <p>{enName}</p>
      {enAlias && <p>{enAlias}</p>}
    </div>
    <div>
      <p>{zhName}</p>
      {zhAlias && <p>{zhAlias}</p>}
    </div>
  </>
);

export const ChildrenTable = () => {
  const account = useSelector(accountInfoSelector);
  if (!account) return null;

  const children = account.family.children;

  return (
    <div>
      {children.map((child) => (
        <Row
          key={child.uuid}
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
    </div>
  );
};
