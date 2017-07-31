import {one, many, chain} from './query';

export const getStudentsForCompany = (domain, companyID) => many(
  `
    SELECT name, email 
    FROM students 
    WHERE id IN (
      SELECT student_id 
      FROM student_companies 
      WHERE company_id = ?
    )
    AND client_id IN (
      SELECT id 
      FROM clients 
      WHERE domain = ?
    );
  `,
  [companyID, domain]
);

export const getCompanies = () => many(
  `SELECT name, id FROM companies;`,
  []
);

export const getClient = (domain) => one(
  `SELECT id, app_display_name, contact_email, client_website FROM clients WHERE domain = ?;`,
  [domain],
  ({id, app_display_name, contact_email, client_website}) => ({
    id,
    appDisplayName: app_display_name,
    contactEmail: contact_email,
    clientWebsite: client_website
  })
);

export const getClientSlug = (domain) => one(
  `SELECT client_slug FROM clients WHERE domain = ?;`,
  [domain],
  ({client_slug}) => client_slug
);

export const register = (domain, name, email, companyName) => chain(
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
      INSERT INTO companies (
        name
      ) VALUES (
        ?
      ) ON DUPLICATE KEY UPDATE name = ?;
    `,
    [companyName, companyName]
  ),
  one(
    `
      INSERT INTO student_companies (
        student_id, 
        company_id
      ) VALUES (
        (SELECT id FROM students WHERE email = ?),
        (SELECT id FROM companies WHERE name = ?)
      );
    `,
    [email, companyName]
  )
);