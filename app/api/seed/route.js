"use server";

import { NextResponse } from "next/server";
import { Client } from "pg";
import fs from "fs";
import path from "path";

// Función para crear la base de datos si no existe
async function createDatabase(dbName, dbUser) {
  const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    database: "postgres", // Base de datos por defecto
  });

  try {
    await client.connect();

    // Crear la base de datos con comillas dobles para evitar errores de sintaxis
    await client.query(`CREATE DATABASE "${dbName}" WITH OWNER = "${dbUser}"`);
    console.log(`Database "${dbName}" created or already exists.`);
  } catch (error) {
    if (error.code === "42P04") {
      console.log(`Database "${dbName}" already exists.`);
    } else {
      console.error("Error creating database:", error);
      throw error;
    }
  } finally {
    await client.end();
  }
}

export async function GET() {
  const dbName = process.env.PG_DATABASE; // Obtener el nombre de la base de datos del entorno
  const dbUser = process.env.PG_USER; // Obtener el usuario de la base de datos del entorno

  try {
    // Crear la base de datos si no existe
    await createDatabase(dbName, dbUser);

    // Conectar a la nueva base de datos
    const client = new Client({
      user: dbUser,
      host: process.env.PG_HOST,
      database: dbName,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
    });

    await client.connect();

    // Leer el archivo seed.sql
    const seedFile = path.join(process.cwd(), "./app/api/seed/seed.sql");
    const seedQuery = fs.readFileSync(seedFile).toString();

    // Ejecutar la consulta de sembrado
    await client.query(seedQuery);

    return NextResponse.json({
      message: "Data seeding and database creation completed successfully",
    });
  } catch (error) {
    console.error("Error during seeding or database creation:", error);
    return NextResponse.json(
      { error: "Failed to seed data or create database" },
      { status: 500 }
    );
  }
}
