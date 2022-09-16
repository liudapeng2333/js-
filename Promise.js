function Promise(executor) {
  this.state = "pending";
  this.callbacks = [];
  this.value;
  this.reason;
  const self = this;
  
  function resolve(value) {
    setTimeout(() => {
      if (self.state === "pending") {
        self.state = "fulfilled";
        self.value = value;
        self.callbacks.forEach((fn) => fn());
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.state === "pending") {
        self.state = "rejected";
        self.reason = reason;
        self.callbacks.forEach((fn) => fn());
      }
    });
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  const self = this;

  let promise2 = new Promise(function (resolve, reject) {
    function handle() {
      if (self.state === "fulfilled") {
        if (typeof onFulfilled === "function") {
          setTimeout(() => {
            try {
              const x = onFulfilled(self.value);
              promiseResolutionProcedure(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        } else {
          resolve(self.value);
        }
      } else if (self.state === "rejected") {
        if (typeof onRejected === "function") {
          setTimeout(() => {
            try {
              const x = onRejected(self.reason);

              promiseResolutionProcedure(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        } else {
          reject(self.reason);
        }
      }
    }
    if (self.state === "pending") {
      self.callbacks.push(handle);
    }
    handle();
  });
  return promise2;
};

function promiseResolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  if (x instanceof Promise) {
    if (x.state === "pending") {
      x.then(function (value) {
        promiseResolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    } else if (x.state === "fulfilled") {
      resolve(x.value);
    } else if (x.state === "rejected") {
      reject(x.reason);
    }
    return;
  }

  if (x && (typeof x === "object" || typeof x === "function")) {
    let isCalled = false;

    try {
      let then = x.then;

      if (typeof then === "function") {
        then.call(
          x,
          function resolvePromise(y) {
            if (isCalled) return;
            isCalled = true;
            return promiseResolutionProcedure(promise2, y, resolve, reject);
          },
          function rejectPromise(r) {
            if (isCalled) return;
            isCalled = true;
            return reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (isCalled) return;
      isCalled = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

module.exports = Promise;
