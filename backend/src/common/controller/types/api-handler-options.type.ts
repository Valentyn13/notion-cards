type DefaultApiHandlerOptions = {
    body?: unknown;
    rawBody?: unknown;
    query?: unknown;
    params?: unknown;
    user?: unknown;
    headers?: unknown;
    cookies?: unknown;
    unsignCookie?: unknown;
    socket?: unknown;
    fileBuffer?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    query: T['query'];
    params: T['params'];
};

export { type ApiHandlerOptions };