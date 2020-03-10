const mockUsers = [
  {
    password: "password",
    accountID: "12345",
    name: "Scrappy Tay",
    phone: "99790059"
  },
  {
    password: "password",
    accountID: "12346",
    name: "Chua Clarence",
    phone: "99790059"
  }
];

export const login = (username, password) => {
  /* use fetch to post username and password pair to backend */
  let user;
  mockUsers.forEach(u => {
    if (username === u.name && password === u.password) user = u;
  });

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    console.log("login success");
    return true;
  } else {
    console.log("login failed");
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = (name, password, phone) => {
  const accountID = 12345 + mockUsers.length;
  mockUsers.push({
    password,
    accountID,
    name,
    phone
  });
};
