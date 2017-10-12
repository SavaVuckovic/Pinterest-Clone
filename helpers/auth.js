/* restrict routes to unauthenticated users */
module.exports = function authMiddleware(req, res, next) {
	  if (req.isAuthenticated()) {
			return next();
		} else {
			res.send('NOT LOGGED IN');
			// send flash message here later
		}
}
