USE CCG_DATABASE;

INSERT INTO ccg_departments
    (name)
VALUES
    ('Senior Investigators'),
    ('Junior Investigators');

INSERT INTO ccg_ghoulratings
    (classification)
VALUES
    ('SSS'),
    ('SS+'),
    ('SS-'),
    ('SS'),
    ('S+'),
    ('S-'),
    ('S'),
    ('A'),
    ('B'),
    ('C');

INSERT INTO ccg_roles
    (title, salary, department_id)
VALUES
    ('Special Class Investigator', 100000, 1),
    ('Associate Special Class Investigator', 80000, 1),
    ('First Class Investigator', 60000, 1),
    ('Second Class Investigator', 50000, 2),
    ('Third Class Investigator', 40000, 2),
    ('Fourth Class Investigator', 30000, 2);

INSERT INTO ccg_employees
    (first_name, last_name, role_id)
VALUES
    ('Koutarou', 'Amon', 1),
    ('Kureo', 'Mado', 1),
    ('Yukinori', 'Shinohara', 1),
    ('Iwao', 'Kuroiwa', 1),
    ('Kishou', 'Arima', 1),
    ('Koori', 'Ui', 1),
    ('Juuzou', 'Suzuya', 1),
    ('Shiki', 'Kijima', 2),
    ('Kousuke', 'Houji', 2),
    ('Koori', 'Ui', 2),
    ('Haise', 'Sasaki', 2),
    ('Keijin', 'Nakarai', 3),
    ('Nobu', 'Shimoguchi', 3),
    ('Naoto', 'Hayashimura', 3),
    ('Juuji', 'Nakata', 3),
    ('Take', 'Hirako', 3);

INSERT INTO ccg_ghouls
    (name, kagune, rating_id)
VALUES
    ('Eto Yoshimura', 'Ukaku', 1),
    ('Yoshimura', 'Ukaku', 1),
    ('Roma Hoito', 'Kakuja', 1),
    ('Ken Kaneki', 'Rinkaku', 1),
    ('Seidou Takizawa', 'Ukaku', 2),
    ('Renji Yomo', 'Ukaku', 2),
    ('Noro', 'Bikaku', 3),
    ('atara', 'Bikaku', 3),
    ('Uta', 'Koukaku', 4),
    ('Hinami Fueguchi', 'Rinkaku', 4),
    ('Kaya Irimi', 'Ukaku', 4),
    ('Ayato Kirishima', 'Ukaku', 4),
    ('Touka Kirishima', 'Ukaku', 4),
    ('Nikishi Nishio', 'Bikaku', 6),
    ('Bin Brothers', 'Bikaku', 7),
    ('Rize Kamishiro', 'Rinkaku', 7),
    ('Demon Yamada', 'Ukaku', 7),
    ('Shuu Tsukiyama', 'Koukaku', 7),
    ('Yakumo Oomori', 'Rinkaku', 7),
    ('Kuki Urie', 'Koukaku', 7),
    ('Karao Saeki', 'Rinkaku', 8),
    ('Akashi Kobayashi', 'Bikaku', 9),
    ('Scarecrow', 'NONE', 9);