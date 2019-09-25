INSERT INTO profiles (name, description, phone, address, picture) values 
    ('Jenny Vossman', 'Leader of the bunch', '913-111-1111', '123 Test Ave.', 'https://google.com/');
INSERT INTO profiles (name, description, phone, address, picture) values 
    ('Collin Vossman', 'Second in command', '913-222-2222', '123 Test Ave.', 'https://google.com/');
INSERT INTO profiles (name, description, phone, address, picture) values 
    ('Lainey Vossman', 'First Born', '913-333-3333', '123 Test Ave.', 'https://google.com/');
INSERT INTO profiles (name, description, phone, address, picture) values 
    ('Daisy Vossman', 'New kid on the block', '913-444-4444', '123 Test Ave.', 'https://google.com/');


INSERT INTO rosters (created_by, title) values (1, 'Vossman Crew');
INSERT INTO rosters (created_by, title) values (1, 'Puppies');
INSERT INTO rosters (created_by, title) values (1, 'Humans');


INSERT INTO profiles_rosters (profile_id, roster_id) values (1,1);
INSERT INTO profiles_rosters (profile_id, roster_id) values (2,1);
INSERT INTO profiles_rosters (profile_id, roster_id) values (3,1);
INSERT INTO profiles_rosters (profile_id, roster_id) values (4,1);

INSERT INTO profiles_rosters (profile_id, roster_id) values (3,2);
INSERT INTO profiles_rosters (profile_id, roster_id) values (4,2);

INSERT INTO profiles_rosters (profile_id, roster_id) values (1,3);
INSERT INTO profiles_rosters (profile_id, roster_id) values (2,3);