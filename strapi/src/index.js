"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
    // To extend the UsersPermissionsMe respond type, and add possibility to add location to it.

    const { toEntityResponse } = strapi
      .plugin("graphql")
      .service("format").returnTypes;
    const extensionService = strapi.plugin("graphql").service("extension");

    extensionService.use(({ nexus }) => ({
      types: [
        nexus.extendType({
          type: "UsersPermissionsMe",
          definition(t) {
            t.field("location", {
              type: "LocationEntityResponse",
              resolve: async (root, args) => {
                const userData = await strapi.db
                  .query("plugin::users-permissions.user")
                  .findOne({
                    // select: [],
                    where: { id: root.id },
                    populate: { location: true },
                  });
                return toEntityResponse(userData.location, {
                  args,
                  resourceUID: "api::location.location",
                });
              },
            });
          },
        }),
      ],
    }));

    // To allow only the creator of a observation to delete and edit it.
    extensionService.use({
      resolversConfig: {
        "Mutation.updateObservation": {
          policies: [
            async (context) => {
              const entity = await strapi.db
                .query("api::observation.observation")
                .findOne({
                  where: { id: context.args.id },
                  populate: { owner: true },
                });

              return entity.owner.id === context.state.user.id;
            },
          ],
        },
        "Mutation.deleteObservation": {
          policies: [
            async (context) => {
              const entity = await strapi.db
                .query("api::observation.observation")
                .findOne({
                  where: { id: context.args.id },
                  populate: { owner: true },
                });

              return entity.owner.id === context.state.user.id;
            },
          ],
        },
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // * seeder for locations
    // const cities = require("../data/se.json");
    // console.log("STRAPI", strapi.service);
    // cities.forEach(async (city) => {
    //   await strapi.entityService.create("api::location.location", {
    //     data: {
    //       city: city.city,
    //       county: city.admin_name,
    //       lat: city.lat,
    //       lng: city.lng,
    //     },
    //   });
    // });
    // * seeder for users and observations
    const seedData = require("../seed/seed");
    const saveUser = async (user) => {
      const data = await strapi.entityService.create(
        "plugin::users-permissions.user",
        {
          data: {
            email: user.email,
            username: user.username,
            provider: "local",
            password: "test123",
            role: { id: 1 },
            location: user.location,
          },
        }
      );
      return data;
    };
    const users = await Promise.all(
      seedData.usersData.map((user) => saveUser(user))
    );
    const getUserWithLoc = async (user) => {
      const userInfo = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: user.id },
          populate: { location: true },
        });
      return userInfo;
    };
    const usersWLoc = await Promise.all(
      users.map((user) => getUserWithLoc(user))
    );
    const saveObs = async (userId) => {
      const obsData = seedData.getWeatherData(userId);
      const savedObs = await strapi.entityService.create(
        "api::observation.observation",
        {
          data: obsData,
        }
      );
      return savedObs;
    };
    const obses = Promise.all(
      usersWLoc.map(async (user) => {
        const obs = [];
        for (let i = 0; i < 20; i++) {
          obs.push(await saveObs(user.id));
        }
        return obs;
      })
    );
    console.log("Saved obs::", obses);
  },
};
