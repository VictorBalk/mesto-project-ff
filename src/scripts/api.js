const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-13",
  headers: {
    authorization: "5689d6c7-8220-42a1-ba34-44843757f0e3",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const updateUserInfo = (profile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: profile.name,
      about: profile.about
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({ avatar: link })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export const addNewCard = (itemCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ name: itemCard.name, link: itemCard.link })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const deleteCard = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    headers: config.headers,
    method: "DELETE",
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const deleteLike = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    headers: config.headers,
    method: "DELETE",
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const addLike = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    headers: config.headers,
    method: "PUT",
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

