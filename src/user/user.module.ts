import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: User.name, useFactory: () => {
      const schema = UserSchema;
      schema.pre('save', function (next) {
        const user = this as any;
        if (!user.isModified('password')) return next();
        bcrypt.genSalt(10, (err, salt) => {
          if (err) return next(err);
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
          });
        });
      });
      return schema;
    }
  }])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
