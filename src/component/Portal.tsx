import { AxiosError } from 'axios';
import { useState, useEffect, FormEvent } from 'react';
import {
  getData,
  postData,
  updateData,
  deleteData,
} from '../services/axiosWrapper/fetch';
import { User, UserDetails } from '../Modal/modal';

function Portal() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [updatingUser, setUpdatingUser] = useState<User | null>(null);

  const handleComponentError = (err: unknown) => {
    if (err instanceof AxiosError) {
      setError(
        err.response?.data?.message ||
          'An error occurred while processing the request.'
      );
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unexpected error occurred.');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getData<User[]>('/users').catch(handleComponentError);
      if (data) setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    const createdUser = await postData<UserDetails, User>(
      '/users',
      newUser
    ).catch(handleComponentError);
    if (createdUser) {
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      setNewUser({ name: '', email: '' });
    }
  };

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();
    if (!updatingUser) return;

    const updatedUser = await updateData<UserDetails, User>(
      `/users/${updatingUser.id}`,
      updatingUser
    ).catch(handleComponentError);
    if (updatedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setUpdatingUser(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const result = await deleteData('/users', userId).catch(
      handleComponentError
    );
    if (result !== undefined) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h2>Create New User</h2>
      <form onSubmit={handleCreateUser}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </label>
        <button type="submit">Create User</button>
      </form>

      {updatingUser && (
        <>
          <h2>Update User</h2>
          <form onSubmit={handleUpdateUser}>
            <label htmlFor="name">
              Name:
              <input
                id="name"
                type="text"
                value={updatingUser.name}
                onChange={(e) =>
                  setUpdatingUser({ ...updatingUser, name: e.target.value })
                }
                required
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                id="email"
                type="email"
                value={updatingUser.email}
                onChange={(e) =>
                  setUpdatingUser({ ...updatingUser, email: e.target.value })
                }
                required
              />
            </label>
            <button type="submit">Update User</button>
            <button type="button" onClick={() => setUpdatingUser(null)}>
              Cancel
            </button>
          </form>
        </>
      )}

      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => setUpdatingUser(user)} type="button">
              Update
            </button>
            <button onClick={() => handleDeleteUser(user.id)} type="button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Portal;
