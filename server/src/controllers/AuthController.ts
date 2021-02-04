import { Request, Response } from "express";
import { Session } from 'express-session';
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import config from "../config/config";
import { Follow } from "../entity/Follow";

class AuthController {
  //Check login credential
  static login = async (req: Request, res: Response) => {
    
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send();
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    // let userTemp = {userId: user.id, username: user.username};
    // let data = {username: user.username};
    //Send the jwt in the response
    // res.send(token);
    // res.status(200).json({ 'message': 'Login Successful', token: token, user: userTemp, 'status': 200 });
    res.send(token);
  };

  // get a profile details for a user (along with follower and follow count) 
  // 2 methods are repeated here to pull the followed and follow count to reduce the cost of traversing the controllers for landing page
  static getProfile = async (req: Request, res: Response) => {
    debugger
    //Get the ID from the url
    const id: string = res.locals.jwtPayload.userId;

    //Get the user from database
    const userRepository = getRepository(User);
    const followRepository = getRepository(Follow);
    try {
      const tempUser = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"] //I dont want to send the password on response
      });
      let rawuser = new User();
      rawuser.id = tempUser.id;
      rawuser.username = tempUser.username;
      rawuser.role = tempUser.role;
      let token = req.headers.authorization.split(' ')[1];

      let followed = await followRepository.createQueryBuilder('follow')
      .select('COUNT(followedid)', 'count')
      .where('followedid = :followedid', { followedid: id })
      .distinct(true)
      .getRawMany();

      let follower = await followRepository.createQueryBuilder('follow')
      .select('COUNT(followerid)', 'count')
      .where('followerid = :followerid', { followerid: id })
      .distinct(true)
      .getRawMany();

      let user = {user: rawuser, token: token, followed: followed[0], follow: follower[0]};
      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  //Change user's password
  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
