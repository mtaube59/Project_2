// Functions that interact with the database WRT searched items
/**
 * topic: year, country, or disaster
 * name:  name of item being stored (country name, year, or disaster name)
 * count: # of times searched
 */
module.exports = function(sequelize, DataTypes) {
  const Searches = sequelize.define("Searches", {
    topic: DataTypes.STRING,
    name: DataTypes.STRING,
    count: DataTypes.INTEGER,   // make this not null
  });
  
  return Searches;
}
