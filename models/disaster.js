// Functions that interact with the database WRT disaster
/**
 * country:  name of country
 * type:  one of: tornado, hurricane, typhoon, earthquake, flood (whatever else we want)
 * date: date of event
 * name: article title
 * description: html text description of event
 * links: array of possible links for more information
 */
module.exports = function(sequelize, DataTypes) {
  const Disaster = sequelize.define("Disaster", {
    country: DataTypes.STRING,
    type: DataTypes.STRING,
    date: DataTypes.DATE,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[1]
      }
    },
    description: DataTypes.STRING
    // links: DataTypes.ARRAY({      // not sure about this....
    //   title: DataTypes.STRING,
    //   url: DataTypes.STRING,
    //   // logo: ????
    // })
  });
  
  return Disaster;
}
