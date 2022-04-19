import { getConnection } from "typeorm";

async function create() {
  const connection = getConnection();

  await connection.query(``);
}

create();
