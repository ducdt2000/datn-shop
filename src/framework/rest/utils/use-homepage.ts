// import { useGroupsQuery } from '@framework/groups/groups.query';
import types from '@framework/types/types.json';

const useHomepage = () => {
  // const { data } = useGroupsQuery();
  const homePage = types?.[0];
  return {
    homePage,
  };
};

export default useHomepage;
