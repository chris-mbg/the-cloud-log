"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    //   const cities = require("../data/sv.json");
    //   console.log("STRAPI", strapi.service);
    //   // console.log("STRAPI", strapi.entityService);
    //   cities.forEach(async (city) => {
    //     await strapi.entityService.create("api::location.location", {
    //       data: {
    //         locality: city.Locality,
    //         municipality: city.Municipality,
    //         county: city.County,
    //         latitude: city.Latitude,
    //         longitude: city.longitude,
    //       },
    //     });
    //   });
  },
};
