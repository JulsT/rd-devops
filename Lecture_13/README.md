1. Creating SchoolDB  with tables

  CREATE DATABASE IF NOT EXISTS SchoolDB;
  USE SchoolDB;

  CREATE TABLE Institutions (
    institution_id INT AUTO_INCREMENT PRIMARY KEY,
    institution_name VARCHAR(100) NOT NULL,
    institution_type ENUM('School', 'Kindergarten') NOT NULL,
    address VARCHAR(255) NOT NULL
  );

  CREATE TABLE Classes (
	  class_id  INT AUTO_INCREMENT PRIMARY KEY,
	  class_name  VARCHAR(50) NOT NULL,
	  institution_id INT NOT NULL,
	  direction ENUM('Mathematics', 'Biology and Chemistry', 'Language Studies'),
	  FOREIGN KEY (institution_id) REFERENCES Institutions(institution_id)
  );

  CREATE TABLE Children (
    child_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    year_of_entry YEAR NOT NULL,
    age INT NOT NULL,
    institution_id INT NOT NULL,
    class_id INT NOT NULL,
    FOREIGN KEY (institution_id) REFERENCES Institutions(institution_id),
    FOREIGN KEY (class_id) REFERENCES Classes(class_id)
  );

  CREATE TABLE Parents (
    parent_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    child_id INT NOT NULL,
    tuition_fee DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (child_id) REFERENCES Children(child_id)
  );

  CREATE TABLE Parents (
    parent_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    child_id INT NOT NULL,
    tuition_fee DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (child_id) REFERENCES Children(child_id)
  );

  ![alt text](<Знімок екрана 2025-04-24 163816.png>)

2. Populating SchoolDb with data (generated with AI)

  -- Adding educational institutions
  INSERT INTO Institutions (institution_name, institution_type, address) VALUES
  ('Kyiv Gymnasium #5', 'School', 'Khreshchatyk St., 15, Kyiv'),
  ('Kindergarten "Sunshine"', 'Kindergarten', 'Les Kurbas St., 8, Kyiv'),
  ('Lviv School #23', 'School', 'Lychakivska St., 45, Lviv');

  -- Adding classes
  INSERT INTO Classes (class_name, institution_id, direction) VALUES
  ('1-A', 1, 'Mathematics'),
  ('2-B', 1, 'Language Studies'),
  ('Senior Group', 2, NULL),
  ('8-C', 3, 'Biology and Chemistry');

  -- Adding children
  INSERT INTO Children (first_name, last_name, birth_date, year_of_entry,   age, institution_id, class_id) VALUES
  ('Alexander', 'Petrenko', '2015-05-12', 2021, 10, 1, 1),
  ('Maria', 'Kovalenko', '2016-03-22', 2022, 9, 1, 2),
  ('Andrew', 'Shevchenko', '2019-08-15', 2023, 6, 2, 3),
  ('Sofia', 'Ivanenko', '2014-11-30', 2020, 11, 3, 4),
  ('Maxim', 'Sydorenko', '2015-02-18', 2021, 10, 1, 1);

  -- Adding parents
  INSERT INTO Parents (first_name, last_name, child_id, tuition_fee) VALUES
  ('Ivan', 'Petrenko', 1, 3500.00),
  ('Elena', 'Kovalenko', 2, 4000.00),
  ('Peter', 'Shevchenko', 3, 2800.00),
  ('Natalia', 'Ivanenko', 4, 3200.00),
  ('Tatiana', 'Sydorenko', 5, 3500.00),
  ('Sergey', 'Petrenko', 1, 3500.00);

3. Queries for SchoolDB

  SELECT 
    c.child_id,
    c.first_name,
    c.last_name,
    i.institution_name,
    i.institution_type,
    cl.class_name,
    cl.direction
  FROM 
    Children c
  JOIN 
    Institutions i ON c.institution_id = i.institution_id
  JOIN 
    Classes cl ON c.class_id = cl.class_id
  ORDER BY 
    c.last_name, c.first_name;

  SELECT 
    p.parent_id,
    p.first_name AS parent_first_name,
    p.last_name AS parent_last_name,
    c.first_name AS child_first_name,
    c.last_name AS child_last_name,
    p.tuition_fee
  FROM 
    Parents p
  JOIN 
    Children c ON p.child_id = c.child_id
  ORDER BY 
    p.last_name, p.first_name;

  SELECT 
    i.institution_id,
    i.institution_name,
    i.institution_type,
    i.address,
    COUNT(c.child_id) AS number_of_children
  FROM 
    Institutions i
  JOIN 
    Children c ON i.institution_id = c.institution_id
  GROUP BY 
    i.institution_id
  ORDER BY 
    number_of_children DESC;

    ![alt text](<Знімок екрана 2025-04-24 165344.png>)

4. Backup db
  mysqldump -u [username] -p SchoolDB > schooldb_backup.sql
  ![alt text](<Знімок екрана 2025-04-27 153629.png>)

  Creating new database and restoring from backup
  mysql -u [username] -p -e "CREATE DATABASE IF NOT EXISTS SchoolDB_Restored;"
  mysql -u [username] -p SchoolDB_Restored < schooldb_backup.sql

  ![alt text](<Знімок екрана 2025-04-27 154315.png>)

5. Data Anonymization Scripts

  CREATE DATABASE IF NOT EXISTS SchoolDB_Backup;

  Backuping db from dump file or from CREATE TABLE LIKE and INSERT

  UPDATE SchoolDB.Children 
  SET first_name = CONCAT('Child', child_id),
    last_name = 'Anonymous';

  UPDATE SchoolDB.Parents 
  SET first_name = CONCAT('Parent', parent_id),
    last_name = 'Anonymous',
    tuition_fee = ROUND(tuition_fee/500) * 500;

  ![alt text](<Знімок екрана 2025-04-27 155924.png>)

  UPDATE SchoolDB.Institutions 
  SET institution_name = CONCAT('Institution', institution_id),
    address = CONCAT('Address', institution_id);

  ![alt text](<Знімок екрана 2025-04-27 160157.png>)