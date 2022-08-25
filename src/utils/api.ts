class Api {
  private _baseUrl: string;
  constructor(options: { baseUrl: string }) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res: { ok: boolean; json: () => unknown; status: number }) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  postSignup(data: {
    name: string;
    email: string;
    password: string;
    dateOfBirth: number | null | Date;
    gender: string;
    avatar: string;
  }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:4000',
});
