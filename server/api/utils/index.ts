export const slugify = (text: string) => {
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const generateRandomString = (len: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = [];

  for (let i = 0; i < len; i++) {
    result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  return result.join('');
};
