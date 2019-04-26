// Functions that interact with the database WRT searched items
/**
 * country:  name of country
 * type:  one of: tornado, hurricane, typhoon, earthquake, flood (whatever else we want)
 * yearStart: beginning of search range
 * yearEnd: end of search range
 */
module.exports = function(sequelize, DataTypes) {
  const SearchedEvent = sequelize.define("SearchedEvent", {
    country: DataTypes.STRING,
    type: DataTypes.STRING,
    yearStart: DataTypes.INTEGER,
    yearEnd: DataTypes.INTEGER
  });
  
  return SearchedEvent;
}
