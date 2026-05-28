CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sex VARCHAR(10) NOT NULL,
    department VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Активный'
);

INSERT INTO patients (name, sex, department, status) VALUES
    ('Иван Иванов', 'Мужской', '1-е урологическое', 'Активный'),
    ('Doktor Stone', 'Мужской', '1-е урологическое', 'На лечении'),
    ('Илон Маск', 'Мужской', '2-е хирургическое', 'Выписан'),
    ('ААААААА', 'Мужской', 'Кардиология', 'Активный'),
    ('Анна Ахматова', 'Женский', '1-е урологическое', 'Активный'),
    ('Елена Еленная', 'Женский', 'Кардиология', 'На лечении');
