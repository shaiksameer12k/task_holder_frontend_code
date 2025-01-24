import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Divider, message, Row, Space, Tooltip } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import {
  AppstoreAddOutlined,
  CaretRightFilled,
  DeleteFilled,
  EditFilled,
  PlusSquareFilled,
} from "@ant-design/icons";
import DrawerComponent from "../../reusable/Drawer/Drawer";
import { useApiCalls } from "../../api/apiCalls";
import axios from "axios";
import moment from "moment";
import PopconfirmComponent from "../../reusable/PopconfirmComponent/PopconfirmComponent";
import LoaderComponent from "../../reusable/Loading/LoadingComponent";

const TaskItem = ({
  deleteTaskHandel,
  editTaskHandel,
  viewTaskHandel,
  ...data
}) => {
  console.log("TaskItemData", data?.TaskItemData);
  let { title, description, updatedAt, borderColor, bgColor, color, _id } =
    data?.TaskItemData;

  // console.log("updatedDate", updatedAt);
  return (
    <Card
      bodyStyle={{ padding: "8px" }}
      size="small"
      className="my-1 shadow-sm"
      style={{
        border: borderColor,
        background: bgColor,
      }}
    >
      <div className="flex justify-between items-center">
        <h3
          className="font-sans text-sm font-semibold"
          style={{ color: color }}
        >
          {title}
        </h3>

        <span className="font-sans text-xs font-normal">
          {moment(updatedAt).fromNow()}
        </span>
      </div>
      <div className="flex items-end gap-4 justify-between">
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex gap-2">
          <Tooltip placement="bottomRight" title="Click To Delete">
            <DeleteFilled
              className="cursor-pointer"
              style={{ fontSize: "16px", color: "red" }}
              onClick={() => deleteTaskHandel(_id)}
            />
          </Tooltip>

          <Tooltip placement="bottomRight" title="Click To Edit">
            <EditFilled
              className="cursor-pointer"
              style={{ fontSize: "16px", color: "skyblue" }}
              onClick={() => editTaskHandel(data?.TaskItemData)}
            />
          </Tooltip>
          <Tooltip placement="bottomLeft" title="Click To View">
            <CaretRightFilled
              className="cursor-pointer"
              style={{ fontSize: "16px", color: "green" }}
              onClick={() => viewTaskHandel(data?.TaskItemData)}
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState("new");
  const [taskList, setTaskList] = useState([]);
  const [fieldsData, setFieldsData] = useState([]);
  const [selectedTaskData, setSelectedTaskData] = useState({});
  const { ApiCalls, loadingStates } = useApiCalls();
  let loginUserId = localStorage.getItem("loginUserId");
  console.log("loginUserId", loginUserId);
  const addNewTaskHandel = () => {
    setOpen(true);
    setTaskStatus("new");
  };

  const deleteTaskHandel = async (taskId = "") => {
    console.log("taskId", taskId);
    if (loadingStates?.deleteTaskHandel) return;
    loadingStates.deleteTaskHandel = true;
    try {
      let params = {
        userId: loginUserId,
        taskId: taskId,
      };
      console.log("params", params);
      let result = await ApiCalls(
        "deleteTaskHandel",
        "delete",
        "user/task",
        params
      );
      if (result) {
        getTasksData();
      }
      console.log("deleteTaskHandel result", result);
    } catch (error) {
      console.log(`Error in deleteTaskHandel ${error}`);
    }
  };

  const editTaskHandel = (data) => {
    console.log("editTaskHandel", data);
    setOpen(true);
    setTaskStatus("edit");
    let updateFieldsData = fieldsData.map((task) => {
      for (let [key, value] of Object.entries(data))
        if (task?.name == key) {
          return { ...task, value: value, taskId: data?._id };
        }
      return task;
    });
    console.log("updateFieldsData", updateFieldsData);
    setFieldsData(updateFieldsData);
  };

  const viewTaskHandel = (data) => {
    console.log("viewTaskHandel", data);
    setOpen(true);
    setSelectedTaskData(data);
    setTaskStatus("preview");
    let updateFieldsData = fieldsData.map((task) => {
      for (let [key, value] of Object.entries(data))
        if (task?.name == key) {
          return { ...task, value: value, taskId: data?._id };
        }
      return task;
    });
    console.log("updateFieldsData", updateFieldsData);
    setFieldsData(updateFieldsData);
  };

  const onCloseDrawerHandel = () => {
    setOpen(false);
  };

  const colorStyles = [
    {
      borderColor: "1px solid #FFE5EE",
      bgColor: "linear-gradient(270.58deg, #FFF1F6 9.37%, #FFFFFF 89.09%)",
      color: "#F26599",
    },
    {
      borderColor: "1px solid #D1EDFF",
      bgColor: "linear-gradient(270.3deg, #F1F4FF 2.3%, #FFFFFF 96.02%)",
      color: "#40ABEE",
    },
    {
      borderColor: "1px solid #EBDCFF",
      bgColor: "linear-gradient(270.47deg, #F2F1FF 5.89%, #FFFFFF 110.53%)",
      color: "#9751F2",
    },
    {
      borderColor: "1px solid #D1EDD1",
      bgColor: "linear-gradient(270.35deg, #F3FFF7 0.75%, #FFFFFF 97.65%)",
      color: "#42CB42",
    },
  ];

  const getTasksData = async () => {
    if (loadingStates?.getTasksData) return;
    loadingStates.getTasksData = true;
    try {
      let result = await ApiCalls(
        "getTasksData",
        "get",
        `user/task?userId=${loginUserId}`
      );

      if (result) {
        let updateArr = result?.data?.map((task) => ({
          ...task,
          ...colorStyles[Math.round(Math.random() * (colorStyles.length - 1))],
        }));
        console.log("updateArr", updateArr);
        setTaskList(updateArr);
      }
      console.log("getTasksData result", result);
    } catch (error) {
      console.log(`Error in getTasksData ${error}`);
    }
  };

  useEffect(() => {
    getTasksData();
  }, [axios.defaults.headers.common["Authorization"]]);

  useEffect(() => {
    if (!open) {
      setFieldsData([
        {
          label: "Task Title",
          isFieldVisible: true,
          value: "",
          type: "text",
          name: "title",
          options: null,
          placeholder: "Enter Task Title",
          isMandatory: true,
          isError: "",
          columnSpace: 24,
          layout: "vertical",
          maxLength: 10,
          regexType: "allowAll",
          hasFeedback: true,
          validateStatus: "default",
          help: "",
        },
        {
          label: "Task Description",
          isFieldVisible: true,
          value: "",
          type: "textArea",
          name: "description",
          options: null,
          placeholder: "Enter Task Description",
          isMandatory: true,
          isError: "",
          columnSpace: 24,
          layout: "vertical",
          maxLength: 150,
          regexType: "allowAll",
          hasFeedback: true,
          validateStatus: "default",
          help: "",
        },
      ]);
    }
  }, [open]);

  console.log("open", open);
  console.log("navigator", navigator.geolocation);
  return (
    <div className="flex justify-center items-start h-lvh ">
      <Card
        className="w-2/5 min-h-96 h-1/2 relative bg-white"
        bodyStyle={{ padding: "12px", boxShadow: " 0px 0px 6px 0px #D4DAE8" }}
      >
        <div className="shape01" style={{ width: "200px", opacity: 0.2 }}></div>
        <div
          className="shape01"
          style={{ width: "200px", opacity: 0.2, top: -60, left: 0 }}
        ></div>
        <div
          className="shape01"
          style={{ width: "100px", opacity: 0.2, top: 150, left: 100 }}
        ></div>

        <Row>
          <Col span={12} className=" gutter-row flex items-center">
            <h1
              className="font-sans text-2xl font-bold "
              style={{ color: "#2C3045" }}
            >
              Tasks
            </h1>
          </Col>
          <Col span={12} className=" gutter-row flex items-center justify-end">
            <Tooltip title="Click To Add New Task">
              <PlusSquareFilled
                className="cursor-pointer text-3xl text-primaryTextColor"
                onClick={addNewTaskHandel}
              />
            </Tooltip>
          </Col>
        </Row>

        <Divider className="my-1" />

        <div
          className=" h-80 overflow-auto custom-scrollbar-container px-2"
          style={{ background: "#F8F8F8" }}
        >
          {loadingStates?.getTasksData ? (
            <LoaderComponent />
          ) : taskList.length > 0 ? (
            taskList?.map((task) => (
              <TaskItem
                deleteTaskHandel={deleteTaskHandel}
                editTaskHandel={editTaskHandel}
                viewTaskHandel={viewTaskHandel}
                TaskItemData={task}
              />
            ))
          ) : (
            <div
              className="h-full flex flex-col justify-center items-center cursor-pointer"
              onClick={addNewTaskHandel}
            >
              <Tooltip title="Click to Add New Task">
                <AppstoreAddOutlined
                  style={{ fontSize: "50px" }}
                  className="text-primaryTextColor"
                />
              </Tooltip>
              <h3 className="text-xl font-sans font-bold text-primaryTextColor">
                No Task!
              </h3>
            </div>
          )}
        </div>
      </Card>

      <DrawerComponent
        drawerState={open}
        onCloseDrawerHandel={onCloseDrawerHandel}
        deleteTaskHandel={deleteTaskHandel}
        editTaskHandel={editTaskHandel}
        taskStatus={taskStatus}
        getTasksDataHandel={getTasksData}
        fieldsData={fieldsData}
        // viewTaskHandel={viewTaskHandel}
        taskData={selectedTaskData}
      />
    </div>
  );
};

export default Dashboard;

/* 

      borderColor: "1px solid #FFE5EE",
      bgColor: "linear-gradient(270.58deg, #FFF1F6 9.37%, #FFFFFF 89.09%)",
      color: "#F26599",
      borderColor: "1px solid #D1EDFF",
      bgColor: "linear-gradient(270.3deg, #F1F4FF 2.3%, #FFFFFF 96.02%)",
      color: "#40ABEE",
      borderColor: "1px solid #EBDCFF",
      bgColor: " linear-gradient(270.47deg, #F2F1FF 5.89%, #FFFFFF 110.53%)",
      color: "#9751F2",
      borderColor: "1px solid #D1EDD1",
      bgColor: " linear-gradient(270.35deg, #F3FFF7 0.75%, #FFFFFF 97.65%)",
      color: "#42CB42",
      

*/
