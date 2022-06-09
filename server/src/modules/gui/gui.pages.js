const INDEX = "index";
const _HEADER = "_header";
const _FOOTER = "_footer";
const ACCOUNT_CREATE = "accountCreate";
const SESSION_CREATE = "sessionCreate";
const ACCOUNT_EDIT = "accountEdit";
const SESSION_DELETED = "sessionDeleted";
const ACCOUNT_DELETED = "accountDeleted";
const CHECKS_CREATE = "checksCreate";
const CHECKS_LIST = "checksList";
const CHECKS_EDIT = "checksEdit";

const pages = {
  header: _HEADER,
  footer: _FOOTER,
  index: INDEX,
  accCreate: ACCOUNT_CREATE,
  sessCreate: SESSION_CREATE,
  accEdit: ACCOUNT_EDIT,
  sessDeleted: SESSION_DELETED,
  accDeleted: ACCOUNT_DELETED,
  checksCreate: CHECKS_CREATE,
  checksList: CHECKS_LIST,
  checksEdit: CHECKS_EDIT,
};

module.exports = pages;
