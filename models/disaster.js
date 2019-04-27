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
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    country: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING
  });
  
  return Disaster;
}
