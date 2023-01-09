USE company_db;
INSERT INTO department(dept_name) VALUES ("sales"), ("engineering"), ("HR");
INSERT INTO role(title,salary,dept_id) VALUES ("sales person", 100000, 1 ), ("engineer", 120000, 2), ("manager", 75000, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Fred", "Sam",3, null), ("Tim", "joe", 1, 1), ("John", "Doe", 2, 1);
-- Here the 