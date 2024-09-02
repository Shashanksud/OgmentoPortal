import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { getData, postData, updateData, deleteData } from '../API/fetch';
import { User, Product, UserDetails } from '../Modal/modal';

function Portal() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line prettier/prettier
  const [newUser, setNewUser] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });
  const [updatingUser, setUpdatingUser] = useState<User | null>(null);
  const [product, setProduct] = useState<Product[]>([]);
  const handleComponentError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      setError(
        err.response?.data?.message ||
          'An error occurred while processing the request.'
      );
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred.');
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getData<User>('/users');
        setUsers(data);
      } catch (err: unknown) {
        handleComponentError(err);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await getData<Product>('/product');
        setProduct(data);
      } catch (err: unknown) {
        handleComponentError(err);
      }
    };
    getProduct();
  }, []);

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const createdUser = await postData<UserDetails, User>('/users', newUser);
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      setNewUser({ name: '', email: '' });
    } catch (err: unknown) {
      handleComponentError(err);
    }
  };

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();
    if (!updatingUser) return;

    try {
      const updatedUser = await updateData<User>(
        `/users/${updatingUser.id}`,
        updatingUser
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setUpdatingUser(null);
    } catch (err: unknown) {
      handleComponentError(err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteData('/users', userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err: unknown) {
      handleComponentError(err);
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

      {/* Users List */}
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
      <ul>
        {product.map((item) => (
          <li key={item.id}>{item.productName}</li>
        ))}
      </ul>
    </>
  );
}

export default Portal;
