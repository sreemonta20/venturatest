import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { Follow } from "../entity/Follow";
import { count } from "console";


class FollowController {

  // All follows list
  static listAll = async (req: Request, res: Response) => {
    const followRepository = getRepository(Follow);
    const users = await followRepository.find({
      select: ["id", "followerid", "followedid"] //I dont want to send the passwords on response
    });


    res.send(users);
  };

  // new follow save
  static newFollow = async (req: Request, res: Response) => {

    const id: string = res.locals.jwtPayload.userId;
    debugger;
    //Get parameters from the body
    let { followerid, followedid } = req.body;
    let follow = new Follow();
    follow.followerid = followerid;
    follow.followedid = followedid;

    // Validade if the parameters are ok
    const errors = await validate(follow);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    let followRepository = getRepository(Follow);
    try {
      await followRepository.save(follow);
    } catch (error) {
      res.status(409).send("can't help");
      return;
    }

    res.status(201).send("following now");
  };

  // number of followers of a specific user
  static followedcount = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    const followRepository = getRepository(Follow);
    try {
      // const followed = await followRepository.createQueryBuilder('Follow').select("follow.followedid = :followedid",{ followedid: conid }).getCount();
      // const count = await logEntry.aggregate('sender_id', 'count', {distinct: true})
      // let followed = await followRepository.query(`SELECT "releaseDate", count("releaseDate") AS "productCount" FROM "product" WHERE "deleted" = false AND "isPublished" = false GROUP BY "releaseDate"`)

      // let followed = await followRepository.query(`SELECT COUNT(DISTINCT F.followedid) FROM follow F  
      // WHERE F.followedid =  GROUP BY F.followedid;`)

      // let products = await followRepository.createQueryBuilder('Follow').select("COUNT(follow.followedid)", "count").dis
      // .where(`product.isPublished = 'false'`)
      // .andWhere(`product.deleted = 'false'`)
      // .groupBy("product.releaseDate")
      // .getManyAndCount();

      let followed = await followRepository.createQueryBuilder('follow')
        .select('COUNT(followedid)', 'count')
        .where('followedid = :followedid', { followedid: id })
        .distinct(true)
        .getRawMany();

      res.send(followed);
    } catch (error) {
      res.status(404).send("followed not counted");
    }
  };

  // number of follows that a specific user follow 
  static followCount = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    const followRepository = getRepository(Follow);
    try {
      const follower = await followRepository.createQueryBuilder('follow')
        .select('COUNT(followerid)', 'count')
        .where('followerid = :followerid', { followerid: id })
        .distinct(true)
        .getRawMany();
      res.send(follower);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  // remove a follow by a specific user
  static deleteFollow = async (req: Request, res: Response) => {
    const id = req.params.id;
    const followRepository = getRepository(Follow);
    let follow: Follow;
    try {
      follow = await followRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("follow not found");
      return;
    }
    followRepository.delete(id);
    res.status(204).send("unfollowed!");
  };
};

export default FollowController;
