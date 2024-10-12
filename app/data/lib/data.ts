import pg from "pg";

export async function fetchCardData() {
  try {
    const client = new pg.Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: 5432,
    });

    await client.connect();

    // Simulamos una demora de 3 segundos (3000 ms)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const result = await client.query("SELECT * FROM users");
    client.end();
    return result.rows;
  } catch {
    return "error";
  }
}
