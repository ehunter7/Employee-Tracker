INSERT INTO department(name) VALUES ("Dispatch");
INSERT INTO department(name) VALUES ("Customer Service");
INSERT INTO department(name) VALUES ("Billing");

INSERT INTO role(title, salary, department_id) VALUES ("Coordinator", "55000", 1);
INSERT INTO role(title, salary, department_id) VALUES ("Dispatcher", "50000", 1);
INSERT INTO role(title, salary, department_id) VALUES ("Dispatcher/ Driver", "60000", 1);

INSERT INTO role(title, salary, department_id) VALUES ("Lead", "70000", 2);
INSERT INTO role(title, salary, department_id) VALUES ("Representative", "60000", 2);
INSERT INTO role(title, salary, department_id) VALUES ("Driver Check-in", "50000", 2);

INSERT INTO role(title, salary, department_id) VALUES ("Recievable", "60000", 3);
INSERT INTO role(title, salary, department_id) VALUES ("Payable", "60000", 3);


INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("David", "Parker", 2, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Queen", "Solar", 3, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Gabe", "James", 1, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Denise", "Pause", 2, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Antonio", "Mirror", 3, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Deanna", "Sanchez", 1, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Grisena", "Moran", 2, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Alex", "Doud", 2, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Anne", "Tellez", 3, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Judy", "Frisk", 2, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Kerri", "Ace", 1, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Adrianna", "Misshiemer", 2, 1);



