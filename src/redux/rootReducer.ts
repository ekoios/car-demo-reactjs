import { combineReducers } from 'redux';

import AddressSlice, { namespace as AddressNamespace } from './address/slice';
import ConnectionSlice, { namespace as ConnectionNamespace } from './connection/slice';
import AuthenticationSlice, { namespace as AuthenticationNameSpace } from './authentication/slice';

export default combineReducers({
  [AddressNamespace]: AddressSlice,
  [ConnectionNamespace]: ConnectionSlice,
  [AuthenticationNameSpace]: AuthenticationSlice,
});
