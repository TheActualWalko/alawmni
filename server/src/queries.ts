import {one, many, chain} from './query';

export const getStudentsForSubject = (domain, subjectName) => many(
  `
    SELECT name, email 
    FROM students 
    WHERE id IN (
      SELECT student_id 
      FROM student_subjects 
      WHERE subject_id IN (
        SELECT id FROM subjects WHERE name = ? 
      )
    )
    AND client_id IN (
      SELECT id 
      FROM clients 
      WHERE domain = ?
    );
  `,
  [subjectName, domain]
);

export const getSubjects = () => many(
  `SELECT name FROM subjects;`,
  []
);

export const getClient = (domain) => one(
  `
    SELECT 
      id, 
      app_display_name, 
      contact_email, 
      client_website,
      primary_color,
      secondary_color
    FROM 
      clients 
    WHERE 
      domain = ?;
   `,
  [domain],
  ({id, app_display_name, contact_email, client_website, primary_color, secondary_color}) => ({
    id,
    appDisplayName: app_display_name,
    contactEmail: contact_email,
    clientWebsite: client_website,
    primaryColor: primary_color,
    secondaryColor: secondary_color
  })
);

export const getClientSlug = (domain) => one(
  `SELECT client_slug FROM clients WHERE domain = ?;`,
  [domain],
  ({client_slug}) => client_slug
);

export const register = (domain, name, email, subjectName) => chain(
  one(
    `
      INSERT INTO students (
        name, 
        email, 
        client_id
      ) VALUES (
        ?, 
        ?, 
        (SELECT id FROM clients WHERE domain = ?)
      ) ON DUPLICATE KEY UPDATE
        name = ?,
        email = ?,
        client_id = (SELECT id FROM clients WHERE domain = ?);
    `,
    [name, email, domain, name, email, domain]
  ),
  one(
    `
      INSERT INTO subjects (
        name
      ) VALUES (
        ?
      ) ON DUPLICATE KEY UPDATE name = ?;
    `,
    [subjectName, subjectName]
  ),
  one(
    `
      INSERT INTO student_subjects (
        student_id, 
        subject_id
      ) VALUES (
        (SELECT id FROM students WHERE email = ?),
        (SELECT id FROM subjects WHERE name = ?)
      );
    `,
    [email, subjectName]
  )
);