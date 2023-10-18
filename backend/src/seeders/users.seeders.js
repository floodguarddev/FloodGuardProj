const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const User = require('../models/user.model');
const Local_Strategy = require('../models/local_strategy.model');

const seedUsers = async (numberOfUsers) => {
    let usersIdArray = [];
    let currentDate = new Date();
    try {
        for(let i = 0; i<numberOfUsers; i++){
            const userData = {
                name: faker.person.firstName() + " " + faker.person.lastName(),
                verified: true,
                email: faker.internet.email(),
                donations: 0, // Always 0
                createdDate: faker.date.between({
                    from:new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 30), // One year ago
                    to: currentDate // Today
                }
                ),
                userPhotoLink: null,
                refreshTokens: [],
              };
          
              const user = new User(userData);
              await user.save();
          
              // Seeding local strategy data
              const saltRounds = 12;
              const password = faker.internet.password(); // Generate a random password
              const hashedPassword = await bcrypt.hash(password, saltRounds);
          
              const localStrategyData = {
                userId: user._id, // Use the _id of the user created above
                hashedPassword,
              };
          
              const localStrategy = new Local_Strategy(localStrategyData);
              await localStrategy.save();

              usersIdArray.push(user._id);
        }
        console.log('Data seeding completed.');
    } catch (error) {
      console.error('Data seeding error:', error);
    }

    return usersIdArray;
};

module.exports =  {seedUsers}