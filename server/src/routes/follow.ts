import { Router } from "express";
  import UserController from "../controllers/UserController";
  import FollowController from "../controllers/FollowController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();
  // All follows list
  router.get("/", [checkJwt], FollowController.listAll);

  // new follow save
  router.post("/",  [checkJwt], FollowController.newFollow);
  
  // number of followers of a specific user
  router.get(
    "/followed/:id([0-9]+)",
    [checkJwt],
    FollowController.followedcount
  );

  // number of follows that a specific user follow 
  router.get(
    "/follower/:id([0-9]+)",
    [checkJwt],
    FollowController.followCount
  );

  // remove a follow by a specific user
  router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    FollowController.deleteFollow
  );

  export default router;