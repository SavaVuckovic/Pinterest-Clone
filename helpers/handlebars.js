module.exports = {
  // allows for adding sections in template files
  section(name, options) {
    if(!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  },
  // checks if user has permissions to edit/delete pins
  editOrDelete(pinAuthorID, loggedUserID) {
    if(pinAuthorID == loggedUserID) {
      return `
      <div class="edit-delete">
        <button id="edit-pin-btn">edit</button>
        <button id="delete-pin-btn">delete</button>
      </div>`;
    } else {
      return '';
    }
  },
  // format date
  formatDate(dateFromMongo) {
    const formattedDate = dateFromMongo.toString().slice(4, 16);
    return formattedDate;
  }
}
