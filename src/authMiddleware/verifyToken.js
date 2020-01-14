import { verify } from 'jsonwebtoken';
import User from '../queries/User';

export function verifyToken (returnData = false) {
  return (req, res, next) => {
    if (req.cookies.access_token) {
      verify(req.cookies.access_token, process.env.JWT_SECRET, async (err, authData) => {
        try {
          if (err) {
            res.sendStatus(401);
          }

          const currentUser = await User.findUser(authData.email);
          if (currentUser.length === 1) {
            req.user = currentUser[0];
            return returnData ? res.send({ id: currentUser[0].id }) : next();
          } else res.sendStatus(401);
        } catch (err) {
          console.log(err);
          res.sendStatus(400);
        }
      });
    } else {
      return returnData ? res.send({ id: null }) : res.sendStatus(403);
    }
  };
}
