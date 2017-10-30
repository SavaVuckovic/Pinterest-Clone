module.exports = {
  // allows for adding sections in template files
  section(name, options) {
    if(!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  },
  // checks if user has permissions to edit/delete pins
  verifyAccess(pinAuthorID, loggedUserID) {
    if(pinAuthorID == loggedUserID) {
      return true;
    } else {
      return false;
    }
  }
}
