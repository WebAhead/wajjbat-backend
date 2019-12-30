const jwt = require("jsonwebtoken");
const { findUser } = require('../src/queries/findUser');

exports.verifyToken = (returnData = false) => (req, res, next) => {
    if (req.cookies.access_token) {
        jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, async (err, authData) => {
            try {
                if (err) {
                    res.sendStatus(401);
                }

                const { rows: currentUser } = await findUser(authData.email);
                if (currentUser.length > 0) {
                    req.id = currentUser[0].id;
                    return returnData ? res.send({ id: currentUser[0].id }) : next();
                }
                else res.sendStatus(401);

            } catch (err) {
                console.log(err);
                res.sendStatus(400);
            }
        })
    } else {
        return returnData ? res.send({ id: null }) : res.sendStatus(403);
    }
}