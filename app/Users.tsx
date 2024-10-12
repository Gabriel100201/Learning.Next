import Image from "next/image";
import { fetchCardData } from "./data/lib/data";

export default async function Users() {
  const users = await fetchCardData();

  return (
    <>
      <h1>Usuarios</h1>
      {users &&
        users !== "error" &&
        users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-[auto_1fr] gap-4 items-center bg-gray-900 px-20 py-5 rounded-lg"
          >
            <Image
              src={`https://avatars.dicebear.com/api/initials/${user.name}.svg`}
              alt={user.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <p>{user.name}</p>
          </div>
        ))}
    </>
  );
}
