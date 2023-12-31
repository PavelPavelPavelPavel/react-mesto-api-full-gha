const avatarRegex = /(http(s?):\/\/)(w{3}\.)?([\w\d\W\D]*)(\w?)[#]?/;
const urlValidation = /(http(s?):\/\/)(w{3}\.)?([\w\d\W\D]*)(\w?)[#]?/;
const idValidation = /^(\w){24}$/;

module.exports = {
  avatarRegex,
  urlValidation,
  idValidation,
};
