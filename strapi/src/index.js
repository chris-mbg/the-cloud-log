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
                console.log("Userdata", userData);
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
  bootstrap({ strapi }) {
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
  },
};
