CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    username TEXT,
    email TEXT,
    avatar TEXT
);

CREATE TABLE groups (
    group_id TEXT PRIMARY KEY,
    group_name TEXT,
    group_icon TEXT,
    group_info TEXT,
    group_balance REAL
);

CREATE TABLE user_group (
    user_group_id TEXT PRIMARY KEY,
    user_id TEXT,
    group_id TEXT,
    user_balance REAL,
    status TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (group_id) REFERENCES groups(group_id)
);
CREATE TABLE transactions (
    transaction_id TEXT PRIMARY KEY,
    group_id TEXT,
    user_id TEXT,
    date TEXT,
    description TEXT,
    amount REAL,
    transaction_icon TEXT,
    FOREIGN KEY (group_id) REFERENCES groups(group_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


INSERT INTO users (user_id, username, email, avatar) VALUES ('uuid1', 'Jorge', 'jorge.coronilla.naranjo@gmail.com', 'https://accounts.google.com/SignOutOptions?hl=es&continue=https://www.google.com%3Fhl%3Des&ec=GBRA8wE');
INSERT INTO users (user_id, username, email, avatar) VALUES ('uuid2', 'Natalia', 'quintomayo@hotmail.com', '');

INSERT INTO groups (group_id, group_name, group_icon, group_info, group_balance) VALUES ('uuid1G', 'Casa', 'house_icon', 'Gastos de la casa', 153.98);
INSERT INTO groups (group_id, group_name, group_icon, group_info, group_balance) VALUES ('uuid2G', 'Coche', 'car_icon', 'Cositas del coche', 153.98);
INSERT INTO groups (group_id, group_name, group_icon, group_info, group_balance) VALUES ('uuid3G', 'Compras', 'shopping_icon', 'Super y demás', 0);
INSERT INTO groups (group_id, group_name, group_icon, group_info, group_balance) VALUES ('uuid4G', 'Vacaciones', 'plane_icon', 'Viajecitos y escapadas' ,0);


INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES ('uuid1UG', 'uuid1', 'uuid1G', 79.49, 'active');
INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES ('uuid2UG', 'uuid1', 'uuid2G', 74.49, 'active');
INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES ('uuid3UG', 'uuid1', 'uuid3G', 0.00, 'active');
INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES ('uuid4UG', 'uuid1', 'uuid4G', 0.00, 'active');

INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES ('uuid5UG', 'uuid2', 'uuid1G', 74.49, 'active');
INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES ('uuid6UG', 'uuid2', 'uuid2G', 79.49, 'active');
INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES ('uuid7UG', 'uuid2', 'uuid3G', 0.00, 'active');
INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES ('uuid8UG', 'uuid2', 'uuid4G', 0.00, 'active');



INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT1', 'uuid1G', 'uuid1', '2023-12-04 15:15:47', 'comunidad', 45.50, 'house_icon');

INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT2', 'uuid1G','uuid1', '2023-12-04 15:18:47', 'internet', 23.00, 'internet_icon');

INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT3', 'uuid1G', 'uuid2', '2023-12-04 15:20:47', 'Supermercado', 55.25, 'shopping_icon');

INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT4', 'uuid1G', 'uuid2', '2023-12-04 15:27:47', 'Frutería', 13.25, 'shopping_icon');

INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT5', 'uuid1G','uuid1', '2023-12-04 15:30:47', 'Día', 10.99, 'shopping_icon');

INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT6', 'uuid1G', 'uuid2', '2023-12-04 15:32:47', 'Pan', 5.99, 'shopping_icon');





INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT7', 'uuid2G', 'uuid2', '2023-12-04 15:15:47', 'ITV', 45.50, 'garage_icon');

INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT8', 'uuid2G','uuid2', '2023-12-04 15:18:47', 'soporte telefono', 23.00, 'shopping_icon');

INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT9', 'uuid2G', 'uuid1', '2023-12-04 15:20:47', 'Seguro', 55.25, 'bill_icon');

INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT10', 'uuid2G', 'uuid1', '2023-12-04 15:27:47', 'Gasolina', 13.25, 'petrol_icon');

INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT11', 'uuid2G','uuid2', '2023-12-04 15:30:47', 'Peaje', 10.99, 'tax_icon');

INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount,transaction_icon)
VALUES ('uuidT12', 'uuid2G', 'uuid1', '2023-12-04 15:32:47', 'Bombilla', 5.99, 'shopping_icon');
