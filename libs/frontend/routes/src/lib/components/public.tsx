import { useEffect, useState } from 'react';

export const PublicRoutes = () => {
  const [pending, setPending] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {}, [currentUser]);
};
