import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Table, Image } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { request } from "../server/request";
import { MainContext } from "../contexts/MainContext";

const { confirm } = Modal;

const StudentsPage = () => {
  const { teacherId, totalStudents } = useContext(MainContext);

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",

      render: (item) => <Image width={100} src={item} alt={item} />,
    },
    {
      title: "Age",
      dataIndex: 'age',
      key: "age",
    },
    {
      title: "IsWork",
      dataIndex: "isMarried",
      key: "isMarried",
      filters: [
        { text: "Working", value: true },
        { text: "Unemployed", value: false },
      ],
      render: (isMarried) => (
        <Fragment>
          {isMarried ? (
            <p style={{ color: "green", fontWeight: "bold" }}>Working</p>
          ) : (
            <p style={{ color: "red", fontWeight: "bold" }}>Unemployed</p>
          )}
        </Fragment>
      ),
      onFilter: (value, record) => record.isMarried === value,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Fragment>
          <div className="btn_wrapper">
            <Button
              onClick={() => editStudent(item.id)}
              type="primary"
              icon={<EditOutlined />}
            />
            <Button
              onClick={() => deleteStudent(item.id)}
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </div>
        </Fragment>
      ),
    },
  ];
  const [searchValue, setSearchValue] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await request.get(`teacher/${teacherId}/student`);
      setStudents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  console.log(totalStudents);
  // //IsMarried  filtering
  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.field === "isWork") {
      const isMarriedOrder = sorter.order === "descend" ? "desc" : "asc";
      const sortedStudents = [...students].sort((a, b) => {
        if (a.isMarried === b.isMarried) return 0;
        if (a.isMarried && !b.isMarried)
          return isMarriedOrder === "asc" ? -1 : 1;
        return isMarriedOrder === "asc" ? 1 : -1;
      });
      setStudents(sortedStudents);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const submit = async () => {
    try {
      let values = await form.validateFields();
      if (selected) {
        console.log(selected);
        await request.put(`teacher/${teacherId}/student/${selected}`, values);
      } else {
        const updatedValues = {
          ...values,
          group: values.group ? [values.group] : [], // Convert group to an array if not empty
        };
        await request.post(
          `teacher/${teacherId}/student/${selected}`,
          updatedValues
        );
      }
      form.resetFields();
      hideModal();
      fetchStudents()
      setStudents();
    } catch (err) {
      console.log(err);
    }
  };

  const searchStudents = async () => {
    try {
      setLoading(true);
      let { data } = await request.get(`teacher/${teacherId}/student`, {
        params: {
          search: searchValue,
        },
      });
      data = data.map((el) => ({ ...el, key: el.id }));
      setStudents(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  async function editStudent(id) {
    let { data } = await request.get(`teacher/${teacherId}/student/${id}`);
    // console.log(id);
    form.setFieldsValue(data);
    setSelected(id);
    showModal();
  }

  const addStudent = () => {
    showModal();
    setSelected(null);
  };

  function deleteStudent(id) {
    confirm({
      title: "Do you Want to delete this student?",
      icon: <ExclamationCircleFilled />,
      onOk: async () => {
        await request.delete(`teacher/${teacherId}/student/${id}`);
        fetchStudents();
      },
    });
  }

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      searchStudents();
    }, 500);

    return () => {
      clearTimeout(delaySearch);
    };
  }, [searchValue]);

  return (
    <Fragment>
      <Table
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Input
              placeholder="Search by name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={searchStudents}
              style={{ width: "100%", marginRight: 16 }}
            />
            <Button onClick={addStudent} type="primary">
              Add Student
            </Button>
          </div>
        )}
        loading={loading}
        columns={columns}
        dataSource={students}
        pagination={{
          position: "bottom",
          pageSize: 10, // Number of items per page
        }}
        onChange={handleTableChange}
      />
      <Modal
        title="Adding teacher"
        open={isModalOpen}
        onOk={submit}
        okText={selected ? "Save" : "Add Student"}
        onCancel={hideModal}
      >
        <Form
          initialValues={{
            isMarried: false,
          }}
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
            name="lastName"
            label="Last name"
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
            name="avatar"
            label="Image"
          >
            <Input placeholder="https://image.com/avatar.png" />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone number">
            <Input placeholder="+998-(90)-123-45-67" />
          </Form.Item>
          <Form.Item name="age" label="Age">
            <Input placeholder="Age " />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Invalid email address!",
              },
            ]}
          >
            <Input placeholder="Email@gmail.com" />
          </Form.Item>
          <Form.Item valuePropName="checked" name="isMarried">
            <Checkbox>Is Work ?</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default StudentsPage;
