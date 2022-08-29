import React from "react";

interface UserItem {
  id: string;
  name: string;
}

const UsersContext: React.Context<{ users: UserItem[] }> = React.createContext({
  users: [] as UserItem[],
});

export default UsersContext;
