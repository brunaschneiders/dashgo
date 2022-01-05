import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: { page },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return { users, totalCount };
}

export function useUsers(page: number) {
  //page é o parâmetro a ser observado a fim de verificar se é necessário buscar os dados
  //sempre que o valor dele é alterado, os dados serão buscados novamente no back-end.
  //e todos os já buscados ficam armazenados em cache.
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 5, //5 seconds
  });
}
