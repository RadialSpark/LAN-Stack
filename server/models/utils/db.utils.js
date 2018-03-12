'use strict';
/**
 * @description Rolls back the database
 * @param tx {object} the loopback transaction object
 */
const rollback = (tx) => {
    return new Promise((resolve, reject) => {
        tx.rollback((err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * @description Commits to the database
 * @param tx {object} the loopback transaction object
 */
const commit = (tx) => {
    return new Promise((resolve, reject) => {
        tx.commit((err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

module.exports = {
    rollback,
    commit
}
