/* restrict routes to unauthenticated users */
module.exports = function authMiddleware () {
	return (req, res, next) => {
		//console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
	  if (req.isAuthenticated()) return next();
	  res.send('NOT LOGGED IN');
		// send flash message here later

	}
}
