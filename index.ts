/* Promise.race - first promise to resolve or reject will be returned */
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 50, "two");
});

Promise.race([promise1, promise2])
  .then((value) => {
    console.log("succeeded with value:", value);
  })
  .catch((reason) => {
    console.error("failed with reason:", reason);
  });

// ------------------------------------------------

/* Promise.any - first promise to resolve will be returned */
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// ------------------------------------------------

/* Promise.allSettled - is typically used when you have multiple asynchronous tasks that are not dependent
 *  on one another to complete successfully, or you'd always like to know the result of each promise.
 */
const promise1 = Promise.reject(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "seconde promise failed")
);
const promise3 = new Promise((resolve, reject) =>
  setTimeout(reject, 1000, "third promise succeeded")
);
const promises = [promise1, promise2, promise3];

Promise.allSettled(promises).then((results) =>
  results.forEach((result: any) => console.log(result.reason))
);

// ------------------------------------------------

/* Promise.all - all promises must resolve if not, returns the first rejection */
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "third promise succeeded");
});
const promises = [promise1, promise2, promise3];

Promise.all(promises)
  .then((values) => console.log(values))
  .catch((reason) => console.error(reason));
