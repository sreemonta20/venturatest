import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { User } from "../entity/User";
import { Follow } from "../entity/Follow";
import { Murmur } from "../entity/Murmur";
import { MurmurEmotion } from "../entity/MurmurEmotion";
import { Emotion } from "../entity/Emotion";
export class Test11612266727290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let user = new User();
    user.username = "iram";
    user.password = "iram";
    user.hashPassword();
    user.role = "USER";
    const userRepository = getRepository(User);
    await userRepository.save(user);

    let follow = new Follow();
    follow.followerid = 2;
    follow.followedid = 3;
    const followRepository = getRepository(Follow);
    await followRepository.save(follow);

    let emotion = new Emotion();
    emotion.emotiontext = "Like";
    const emotionRepository = getRepository(Emotion);
    await emotionRepository.save(emotion);


    let murmur = new Murmur();
    murmur.ownerid = 2;
    murmur.murmurtext = "Hi this is my text";
    const murmurRepository = getRepository(Murmur);
    await murmurRepository.save(murmur);

    let murmuremotion = new MurmurEmotion();
    murmuremotion.murmurid = 1;
    murmuremotion.emotionid = 1;
    murmuremotion.istrue = true;
    const murmuremoRepository = getRepository(MurmurEmotion);
    await murmuremoRepository.save(murmuremotion);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
