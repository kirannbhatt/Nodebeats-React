import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');
const selectRouter = state => state.get('router');
const selectLogin = state => state.get('login');

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.get('location').toJS(),
  );
const makeSelectUser = () => createSelector(selectLogin, state => state.get('userInfo'));

export { 
  makeSelectLocation,
  makeSelectUser
};
