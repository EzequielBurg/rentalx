import { hash } from "bcryptjs";

import createConnection from "..";

async function create() {
  const connection = await createConnection();

  const id = "40706fdc-c376-4576-ad3c-da7ed56b23e2";

  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
      values('${id}', 'admin', 'admin@rentalx.com', '${password}', '123456', 'true', 'now()')`
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));
