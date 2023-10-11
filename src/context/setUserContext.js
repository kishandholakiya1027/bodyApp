import React, { createContext } from 'react';

const UserParamContext = createContext({ user: null, setUser: () => { } });
export default UserParamContext;