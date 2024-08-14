import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Connection, Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  private _profilesRepository: Repository<ProfileEntity>;
  constructor(private _connection: Connection) {
    this._profilesRepository = this._connection.getRepository(ProfileEntity);
  }

  async create(createProfileDto: CreateProfileDto) {
    // == creates a new entity instance ==
    const newProfile = this._profilesRepository.create();

    newProfile.photoUrl = createProfileDto.photoUrl;
    newProfile.jobTitle = createProfileDto.jobTitle;
    newProfile.personalWebsite = createProfileDto.personalWebsite;
    newProfile.biography = createProfileDto.biography;

    // == saves the course to db ==
    await this._profilesRepository.save(newProfile);
    return newProfile;

    //return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profile`;
  }

  async findOne(e: string) {
    return await this._profilesRepository.findOne({ where: { email: e } });

  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

   async remove(e: string) {
    const del =  await this._profilesRepository.findOne({ where: { email: e } });
    return await this._profilesRepository.delete(del);
  }
}
