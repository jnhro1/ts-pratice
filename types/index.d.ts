import User from '../models/user';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: User;
//     }
//   }
// }

declare global {
  namespace Express {
      export interface User extends IUser {}
  }
}
