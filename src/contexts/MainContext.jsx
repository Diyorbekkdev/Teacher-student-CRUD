import { Form } from "antd";
import { createContext,useState } from "react";
// import { request } from "../server/request";

export const MainContext = createContext();

// Create the MainProvider component
export const MainProvider = ({ children }) => {
  // Define your states
  const [searchValue, setSearchValue] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [teacherId, setTeacherId] = useState();
  const [totalStudents, setTotalStudents] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const [isAuth, setAuth] = useState(false);
console.log(isAuth);
  // Fetch teachers data from the server

  // Define the context value
  const contextValue = {
    searchValue,
    setSearchValue,
    teachers,
    setTeachers,
    loading,
    setLoading,
    isModalOpen,
    setIsModalOpen,
    selected,
    setSelected,
    teacherId,
    setTeacherId,
    totalStudents,
    setTotalStudents,
    username,
    setUsername,
    password,
    setPassword,
    form,
    isAuth,
    setAuth,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
