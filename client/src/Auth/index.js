export const login = async (username, password) => {
  /* use fetch to post username and password pair to backend */
  const response = await fetch(`http://172.21.148.170/api/user/authenticate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: username, password: password })
  });

  const content = await response.json();
  console.log(content);
  const { loginSuccess } = content;
  if (loginSuccess) {
    delete content.data.password;
    const { data } = content;
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify(data));
    }
  }

  return content.loginSuccess;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = async values => {
  const response = await fetch(`http://172.21.148.170/api/user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  const content = await response.json();
  return content;
};
