export const toTitleCase = (text: string) => {
  return `${text[0].toUpperCase()}${text.slice(1)}`;
};

export const validateField = (
  path: string,
  value: string,
  minLen: number,
  maxLen: number
) => {
  const titledPath = toTitleCase(path);
  if (!value) {
    return { path, message: `${titledPath} is required.` };
  } else if (value.length < minLen) {
    return {
      path,
      message: `${titledPath} can not be less than ${minLen} characters.`,
    };
  } else if (value.length > maxLen) {
    return {
      path,
      message: `${titledPath} can not be more than ${maxLen} characters.`,
    };
  }
};

let dateTimeFormatter: Intl.DateTimeFormat;

export const formatDateTime = (dateString: string) => {
  if (!dateString) {
    return '';
  }

  if (!dateTimeFormatter) {
    dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  return dateTimeFormatter.format(new Date(dateString));
};
