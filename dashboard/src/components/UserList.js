import React from 'react';

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  background: '#f2f2f2'
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px'
};

const UserList = ({ users }) => (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={thStyle}>ID</th>
        <th style={thStyle}>Nombre</th>
        <th style={thStyle}>Email</th>
      </tr>
    </thead>
    <tbody>
      {users.map(u => (
        <tr key={u.id}>
          <td style={tdStyle}>{u.id}</td>
          <td style={tdStyle}>{u.firstName} {u.lastName}</td>
          <td style={tdStyle}>{u.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserList;
