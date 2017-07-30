import {isArray} from 'lodash';

export const many = (queryText, parameters, transform = (x) => x) => (db) => {
  return new Promise((resolve, reject) => {
    db.query(queryText, parameters, (err, result)=>{
      if (err) {
        reject(err);
      } else {
        if (isArray(result)) {
          resolve(result.map((x) => transform(x)));
        } else {
          // non-array results seem to usually be messages from mysql
          resolve(result);
        }
      }
    })
  });
};

export const one = (queryText, parameters, transform = (x) => x) => (db) => {
  return many(queryText, parameters, transform)(db).then(results => results[0]);
};

export const chain = (...queries) => (db) => {
  if (queries.length > 0) {
    return queries[0](db)
      .then(() => chain.apply(null, queries.slice(1))(db))
  } else {
    return Promise.resolve();
  }
}