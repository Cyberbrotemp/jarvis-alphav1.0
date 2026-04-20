// Local "database" using localStorage. No size limit beyond browser quota.

export type User = {
  email: string;
  name: string;
  password: string;
  avatar?: string; // dataURL
  createdAt: number;
};

const USERS_KEY = "jarvis.users";
const SESSION_KEY = "jarvis.session";
const THEME_KEY = "jarvis.theme";
const HISTORY_PREFIX = "jarvis.history.";
const LIKES_PREFIX = "jarvis.likes.";
const SAVED_PREFIX = "jarvis.saved.";

export const getUsers = (): User[] => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
};
export const saveUsers = (users: User[]) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const findUser = (email: string) =>
  getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase().trim());

export const upsertUser = (user: User) => {
  const users = getUsers().filter(
    (u) => u.email.toLowerCase() !== user.email.toLowerCase()
  );
  users.push(user);
  saveUsers(users);
};

export const getSession = (): string | null =>
  localStorage.getItem(SESSION_KEY);
export const setSession = (email: string) =>
  localStorage.setItem(SESSION_KEY, email);
export const clearSession = () => localStorage.removeItem(SESSION_KEY);

export const getCurrentUser = (): User | null => {
  const email = getSession();
  if (!email) return null;
  return findUser(email) ?? null;
};

export const getTheme = (): string =>
  localStorage.getItem(THEME_KEY) || "jarvis";
export const setTheme = (t: string) => localStorage.setItem(THEME_KEY, t);

const userKey = (prefix: string, email: string) => `${prefix}${email.toLowerCase()}`;

export const getHistory = (email: string): string[] => {
  try { return JSON.parse(localStorage.getItem(userKey(HISTORY_PREFIX, email)) || "[]"); } catch { return []; }
};
export const addToHistory = (email: string, toolId: string) => {
  const list = getHistory(email).filter((id) => id !== toolId);
  list.unshift(toolId);
  localStorage.setItem(userKey(HISTORY_PREFIX, email), JSON.stringify(list.slice(0, 200)));
};

export const getLikes = (email: string): string[] => {
  try { return JSON.parse(localStorage.getItem(userKey(LIKES_PREFIX, email)) || "[]"); } catch { return []; }
};
export const toggleLike = (email: string, toolId: string): boolean => {
  const list = getLikes(email);
  const i = list.indexOf(toolId);
  if (i >= 0) list.splice(i, 1); else list.unshift(toolId);
  localStorage.setItem(userKey(LIKES_PREFIX, email), JSON.stringify(list));
  return i < 0;
};
export const isLiked = (email: string, toolId: string) =>
  getLikes(email).includes(toolId);

export const getSaved = (email: string): string[] => {
  try { return JSON.parse(localStorage.getItem(userKey(SAVED_PREFIX, email)) || "[]"); } catch { return []; }
};
export const toggleSaved = (email: string, toolId: string): boolean => {
  const list = getSaved(email);
  const i = list.indexOf(toolId);
  if (i >= 0) list.splice(i, 1); else list.unshift(toolId);
  localStorage.setItem(userKey(SAVED_PREFIX, email), JSON.stringify(list));
  return i < 0;
};
export const isSaved = (email: string, toolId: string) =>
  getSaved(email).includes(toolId);
