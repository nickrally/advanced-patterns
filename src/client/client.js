//a fake client

const sleep = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const updateUser = async (user, payload) => {
  const timeout = 1500;
  await sleep(timeout); //simulate wait
  if (`${payload.tagline} ${payload.bio}`.includes("oh noes!")) {
    return Promise.reject({ message: "OH NOES! Reverting to storedUser" });
  }
  return { ...user, ...payload };
};
