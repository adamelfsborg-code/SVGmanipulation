const postRequest = async (endpoint, data = {}) => {
  const response = await fetch(endpoint, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const getRequest = async (endpoint) => {
  const response = await fetch(endpoint, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

const submitBodyParts = async () => {
  const data = await getIsFilledBodyParts();
  const post = await postRequest("post-body/", data);
  if (post.result) {
    loadBodies();
  } else {
    console.log("hejdå");
  }
};

const getAllBodies = async () => {
  const get = await getRequest("get-all-bodies/");
  if (get.result.length > 0) return get;
};
