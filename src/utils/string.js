export const emailOrUsernameToUserNameTitleCase = (text) => {
  let username = text;
  if(text.includes('@')) {
    const index = text.indexOf('@');
    username = text.substring(0, index);
  }
  username = username.toLowerCase();
  const usernames = username.split('');
  usernames[0] = usernames[0].toUpperCase();
  return usernames.join('');
}
