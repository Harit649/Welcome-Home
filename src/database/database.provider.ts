import { Sequelize } from "sequelize-typescript";
import { Admin } from "src/entities/admin.entity";
import { AdminActivations } from "src/entities/adminactivation.entity";
import { AdminSessions } from "src/entities/admin.Session.entity";
import { PasswordReset } from "src/entities/passwordreset.entety";
import { Category } from "src/entities/category.entity";
import { Item } from "src/entities/item.entity";
import { Group } from "src/entities/group.entity";
import { Person } from "src/entities/person.entity";

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          password: process.env.DATABASE_PASSWORD,
          username: process.env.DATABASE_USERNAME,
          database: process.env.DATABASE_NAME,
          logging: false,
          pool: {
            max: 100,
            min: 0,
            acquire: 30000,
            idle: 5000,
          },
        });
  
        sequelize.addModels([Admin, AdminActivations, AdminSessions, PasswordReset, Category, Item, Group, Person]);
  
        await sequelize
          .sync({ force: false }) // if force would be true then all the data deletion will be performing a hard deletion..
          .then(async () => {
            // return await DatabaseSeeder.run();
          })
          .then(() => {
            console.log('********** Successfully seeded db **********');
          })
          .catch((err) => {
            console.log(process.env.DATABASE_NAME,"======================================>");
            
            console.log(err);
            console.log('********** Error in database sedding **********');
          });
  
        return sequelize;
      },
    },
  ];