CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE SEQUENCE IF NOT EXISTS ticket_id_seq;

CREATE TABLE IF NOT EXISTS USERS
(
  Email VARCHAR(64) NOT NULL,
  Name VARCHAR(15),
  Pin INTEGER,
  User_id UUID NOT NULL DEFAULT uuid_generate_v1(),
  PRIMARY KEY(User_id)
);
  
CREATE TABLE IF NOT EXISTS SUPPORTS
(
  Support_id UUID NOT NULL DEFAULT uuid_generate_v1(),
  Supportee_id UUID,
  Supporter_id UUID,
  Sharing_level INTEGER,
  PRIMARY KEY(Support_id),
  FOREIGN KEY (Supportee_id) REFERENCES USERS(user_id),
  FOREIGN KEY (Supporter_id) REFERENCES USERS(user_id)
);

CREATE TABLE IF NOT EXISTS QUESTIONS
(
  Question_id UUID NOT NULL DEFAULT uuid_generate_v1(),
  Category VARCHAR(64),
  Question VARCHAR(254),
  Type VARCHAR(64),
  Suggestions VARCHAR(254),
  PRIMARY KEY(Question_id)
);


CREATE TABLE IF NOT EXISTS RESPONSE
(
  Response_id UUID NOT NULL DEFAULT uuid_generate_v1(),
  data VARCHAR(254),
  date DATE,
  PRIMARY KEY(response_id)
);


CREATE TABLE IF NOT EXISTS Answers
(
  Questions_id UUID NOT NULL,
  User_id UUID NOT NULL,
  Response_id UUID NOT NULL,
  PRIMARY KEY(Questions_id, User_id, Response_id),
  FOREIGN KEY (Questions_id) REFERENCES QUESTIONS(Question_id),
  FOREIGN KEY (User_id) REFERENCES USERS(User_id),
  FOREIGN KEY (Response_id) REFERENCES RESPONSE(Response_id)
);