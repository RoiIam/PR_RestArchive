import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  //constructor(private _connection: Connection) {
  //this._studentsRepository = this._connection.getRepository(StudentsEntity);
  //}

  getHello(): string {
    return 'Hello World!';
  }
}
