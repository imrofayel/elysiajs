import { Elysia } from "elysia";
import userRoutes from "./user";
import { openapi } from '@elysiajs/openapi'

const app = new Elysia();

app.use(openapi({
  provider: "scalar",
  path: "/docs",
  scalar: {
    title: 'API Docs',
    description: 'This is the API documentation for my service.',
    theme: 'dark',
    customCss: ''
  },
  documentation: {
    info: {
      title: 'My API',
      description: 'This is the API documentation for my service.',
      version: '1.0.0'
    }
  }
  
}));

app.get("/", () => "Hello World!");

app.use(userRoutes);

app.onError(({ code, error }) => {
    if (code === 'NOT_FOUND') {
        return new Response(
            JSON.stringify({ error: 'Page not found.' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        )
    }

    return new Response(
        JSON.stringify({ error: error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
})

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);