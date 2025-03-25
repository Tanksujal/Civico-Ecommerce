import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAdmin } from "../redux/features/Admin/adminslice";

const AdminPrivate = ({ children }) => {
  const dispatch = useDispatch();
  const { admin, loading } = useSelector((state) => state.admin);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(fetchAdmin()).finally(() => setChecked(true));
  }, [dispatch]);


  // ✅ Show loading state while checking authentication
  if (loading || !checked) return <p>Loading...</p>;

  // ✅ Redirect if admin is not authenticated
  if (!admin) return <Navigate to="/login" />;

  // ✅ Render children if admin is authenticated
  return children;
};

export default AdminPrivate;
