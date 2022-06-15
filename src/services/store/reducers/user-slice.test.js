test("Should fulfill createUserProfile", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: () =>
        Promise.resolve({
          user: { email: "user@mail.ru", name: "user" },
          accessToken: "accessToken",
          refreshToken: "refreshToken",
          success: true,
        }),
      ok: true,
    });

    await store.dispatch(
      createUserProfile({
        email: "user@mail.ru",
        name: "user",
        password: "password",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      user: { email: "user@mail.ru", name: "user" },
      tokens: { accessToken: "accessToken", refreshToken: "refreshToken" },
      status: "registerUser/success",
    });
  });