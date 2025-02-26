import React, { use } from 'react';
import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';

export default function useAuth() {
  return (
     useContext(AuthContext)
  )
}
