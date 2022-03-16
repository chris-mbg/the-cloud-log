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
