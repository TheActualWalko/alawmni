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

export const getAllSubjects = () => many(
  `SELECT name FROM subjects;`,
  []
);

export const getSubjectsWithStudents = (domain) => many(
  `
    SELECT name 
    FROM subjects
    WHERE id IN (
      SELECT subject_id 
      FROM student_subjects
      WHERE student_id IN (
        SELECT id
        FROM students
        WHERE client_id IN (
          SELECT id
          FROM clients
          WHERE domain = ?
        )
      )
    );
  `,
  [domain]
);

export const getClientDomainFromSlug = (slug) => one(
  `
    SELECT domain
    FROM clients
    WHERE client_slug = ?;
  `,
  [slug]
);

export const getClient = (domain) => one(
  `
    SELECT 
      id, 
      app_display_name, 
      contact_email, 
      client_website,
      primary_color,
      secondary_color,
      search_input_title,
      recommended_searches_text,
      registration_subject_input_title
    FROM 
      clients 
    WHERE 
      domain = ?;
   `,
  [domain],
  ({
    id, 
    app_display_name, 
    contact_email, 
    client_website,
    primary_color,
    secondary_color,
    search_input_title,
    recommended_searches_text,
    registration_subject_input_title
  }) => ({
    id,
    appDisplayName: app_display_name,
    contactEmail: contact_email,
    clientWebsite: client_website,
    primaryColor: primary_color,
    secondaryColor: secondary_color,
    searchInputTitle: search_input_title,
    recommendedSearchesText: recommended_searches_text,
    registrationSubjectInputTitle: registration_subject_input_title
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

export const track = (domain, ip, action, data) => one(
  `
    INSERT INTO activity (
      client_id,
      ip,
      action,
      data
    ) VALUES (
      (SELECT id FROM clients WHERE domain = ?),
      ?,
      ?,
      ${
        action === 'selectSubject' 
          ? 'CONCAT(?, " [", (SELECT id FROM subjects WHERE name = ?), "]")' 
          : '?'
      }
    )
  `,
  action === 'selectSubject' 
    ? [domain, ip, action, data, data] 
    : [domain, ip, action, data]
);