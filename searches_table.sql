SELECT * FROM disasters_db.searches;

TRUNCATE TABLE disasters_db.searches;

INSERT INTO disasters_db.searches (topic, name, count, createdAt, updatedAt) VALUES
 ('country', 'Nigeria', 1, curdate(), curdate()),
 ('type', 'Tornado', 1, curdate(), curdate()),
 ('country', 'Peru', 1, curdate(), curdate()),
 ('country', 'Burundi', 1, curdate(), curdate()),
 ('type', 'Earthquake', 1, curdate(), curdate())

