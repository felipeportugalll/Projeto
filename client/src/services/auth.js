export const TOKEN_KEY = '&app-token';
export const USER_ID = '&user-id';
export const USER_NAME = '&user-name';
export const USER_TYPE = '&user-type';

export const login = token => { localStorage.setItem(TOKEN_KEY, token); }
export const logout = () => { localStorage.clear() };

export const setUserId = id => localStorage.setItem(USER_ID,id); //recebe um parametro de id
export const getUserId = () => localStorage.getItem(USER_ID);

export const setUserName = name => localStorage.setItem(USER_NAME,name);
export const getUserName = () => localStorage.getItem(USER_NAME);

export const setUserType = type => localStorage.setItem(USER_TYPE,type); 
export const getUserType = () => localStorage.getItem(USER_TYPE);

export const getToken = () => localStorage.getItem(TOKEN_KEY);
