INSERT INTO activity(name, description) VALUES
('Corrida', 'Correr é uma ótima maneira de aumentar a frequência cardíaca e manter a forma.'),
('Caminhada', 'Caminhar é um exercício de baixo impacto que ajuda a melhorar a saúde cardiovascular e a forma física geral.'),
('Natação', 'A natação é uma excelente forma de se manter em forma e se refrescar no verão.'),
('Yoga', 'Yoga é uma ótima maneira de relaxar, melhorar a flexibilidade e manter a forma.'),
('Ciclismo', 'O ciclismo é uma ótima maneira de se locomover, aumentar a resistência e manter a forma.'),
('Futebol', 'O futebol é uma excelente maneira de se divertir, desenvolver habilidades de trabalho em equipe e manter a forma.'),
('Vôlei', 'O vôlei é uma ótima maneira de se divertir e manter a forma.'),
('Basquete', 'O basquete é uma ótima maneira de se divertir e manter a forma.');

INSERT INTO benefit(name, description) VALUES
('Risco cardiovascular', 'A saúde cardiovascular é importante para a saúde e o bem-estar geral.'),
('Melhoria da Saúde Mental', 'Reduz o estresse, a ansiedade e a depressão, liberando endorfinas que melhoram o humor.'),
('Saúde Respiratória', 'Melhora a capacidade pulmonar e a eficiência do sistema respiratório.'),
('Controle do peso', 'O ciclismo é eficaz para queimar calorias e ajudar na perda ou manutenção de um peso saudável.'),
('Fortalecimento muscular', 'Requer coordenação entre pernas, braços e tronco, melhorando o equilíbrio geral.'),
('Coordenação e Equilíbrio', 'Melhora a coordenação motora e o equilíbrio geral.'),
('Redução do Risco de Diabetes Tipo 2', 'Ajuda no controle de peso, que é importante para a saúde e o bem-estar geral.'),
('Benefícios para o Sistema Imunológico', 'Fortalece o sistema imunológico.'),
('Bem-Estar Geral', 'Promove uma sensação geral de bem-estar e melhora a qualidade de vida.'),
('Articulações e Ossos', 'É uma atividade de baixo impacto, menos agressiva para as articulações.');

INSERT INTO activity_benefit(activity_id, benefit_id) VALUES
((SELECT id FROM activity WHERE name = 'Corrida'), (SELECT id FROM benefit WHERE name = 'Risco cardiovascular')),
((SELECT id FROM activity WHERE name = 'Corrida'), (SELECT id FROM benefit WHERE name = 'Melhoria da Saúde Mental')),
((SELECT id FROM activity WHERE name = 'Caminhada'), (SELECT id FROM benefit WHERE name = 'Risco cardiovascular')),
((SELECT id FROM activity WHERE name = 'Caminhada'), (SELECT id FROM benefit WHERE name = 'Articulações e Ossos')),
((SELECT id FROM activity WHERE name = 'Natação'), (SELECT id FROM benefit WHERE name = 'Saúde Respiratória')),
((SELECT id FROM activity WHERE name = 'Natação'), (SELECT id FROM benefit WHERE name = 'Fortalecimento muscular')),
((SELECT id FROM activity WHERE name = 'Yoga'), (SELECT id FROM benefit WHERE name = 'Melhoria da Saúde Mental')),
((SELECT id FROM activity WHERE name = 'Yoga'), (SELECT id FROM benefit WHERE name = 'Coordenação e Equilíbrio')),
((SELECT id FROM activity WHERE name = 'Ciclismo'), (SELECT id FROM benefit WHERE name = 'Controle do peso')),
((SELECT id FROM activity WHERE name = 'Ciclismo'), (SELECT id FROM benefit WHERE name = 'Redução do Risco de Diabetes Tipo 2')),
((SELECT id FROM activity WHERE name = 'Futebol'), (SELECT id FROM benefit WHERE name = 'Fortalecimento muscular')),
((SELECT id FROM activity WHERE name = 'Futebol'), (SELECT id FROM benefit WHERE name = 'Bem-Estar Geral')),
((SELECT id FROM activity WHERE name = 'Vôlei'), (SELECT id FROM benefit WHERE name = 'Coordenação e Equilíbrio')),
((SELECT id FROM activity WHERE name = 'Vôlei'), (SELECT id FROM benefit WHERE name = 'Bem-Estar Geral')),
((SELECT id FROM activity WHERE name = 'Basquete'), (SELECT id FROM benefit WHERE name = 'Fortalecimento muscular')),
((SELECT id FROM activity WHERE name = 'Basquete'), (SELECT id FROM benefit WHERE name = 'Coordenação e Equilíbrio'));
