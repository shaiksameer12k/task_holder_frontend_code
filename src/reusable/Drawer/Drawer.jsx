import React from "react";
import { Drawer, Tooltip } from "antd";
import { CaretRightFilled, DeleteFilled, EditFilled } from "@ant-design/icons";
import InputField from "../InputField/InputField";
import FormLayout from "../FormLayout/FormLayout";
import { useApiCalls } from "../../api/apiCalls";

const DrawerComponent = ({
  drawerState,
  onCloseDrawerHandel,
  deleteTaskHandel,
  editTaskHandel,
  taskStatus,
  getTasksDataHandel,
  fieldsData,
  taskData,
}) => {
  let loginUserId = localStorage.getItem("loginUserId");
  let { ApiCalls, loadingStates } = useApiCalls();
  let {
    title,
    description,
    updatedDate,
    color,
    createdAt,
    borderColor,
    bgColor,
  } = taskData;

  console.log("taskData", taskData, fieldsData);

  const onSubmitGetFieldsDataCallback = async (data, paramsData) => {
    try {
      let params = {
        ...paramsData,
        userId: loginUserId,
      };
      console.log("onSubmitGetFieldsDataCallback", data, paramsData, params);

      let result = await ApiCalls(
        "onSubmitGetFieldsDataCallback",
        "post",
        "user/task",
        params
      );

      if (result?.statusCode === 200) {
        onCloseDrawerHandel();
        getTasksDataHandel();
      }

      console.log("onSubmitGetFieldsDataCallback", result);
    } catch (error) {
      console.log(`Error while onSubmitGetFieldsDataCallback ${error} `);
    }
  };

  const onUpdateGetFieldsDataCallback = async (data, paramsData) => {
    let { taskId } = data[0];
    console.log("onUpdateGetFieldsDataCallback", data, paramsData);
    try {
      let params = {
        ...paramsData,
        userId: loginUserId,
        taskId: taskId,
        status: "Completed",
      };
      console.log("onUpdateGetFieldsDataCallback", data, paramsData, params);

      let result = await ApiCalls(
        "onUpdateGetFieldsDataCallback",
        "put",
        "user/task",
        params
      );

      if (result?.statusCode === 200) {
        onCloseDrawerHandel();
        getTasksDataHandel();
      }

      console.log("onUpdateGetFieldsDataCallback", result);
    } catch (error) {
      console.log(`Error while onUpdateGetFieldsDataCallback ${error} `);
    }
  };

  return (
    <>
      <Drawer
        title={
          taskStatus == "edit"
            ? "Edit Task"
            : taskStatus == "new"
            ? "Add New Task"
            : "Preview Task"
        }
        onClose={onCloseDrawerHandel}
        open={drawerState}
        width={400}
        bodyStyle={{ background: bgColor }}
        extra={
          taskStatus == "edit" && (
            <div className="flex gap-3">
              <Tooltip placement="bottomRight" title="Click To Delete">
                <DeleteFilled
                  className="cursor-pointer"
                  style={{ fontSize: "18px", color: "red" }}
                  onClick={deleteTaskHandel}
                />
              </Tooltip>

              {taskStatus == "preview" && (
                <Tooltip placement="bottomRight" title="Click To Edit">
                  <EditFilled
                    className="cursor-pointer"
                    style={{ fontSize: "18px", color: "skyblue" }}
                    onClick={editTaskHandel}
                  />
                </Tooltip>
              )}
            </div>
          )
        }
      >
        {taskStatus == "new" || taskStatus == "edit" ? (
          <FormLayout
            fieldsData={fieldsData}
            onSubmitGetFieldsDataCallback={
              taskStatus == "edit"
                ? onUpdateGetFieldsDataCallback
                : onSubmitGetFieldsDataCallback
            }
            taskStatus={taskStatus}
            buttonLoading={
              taskStatus == "edit"
                ? loadingStates?.onUpdateGetFieldsDataCallback
                : loadingStates?.onSubmitGetFieldsDataCallback
            }
          />
        ) : (
          <div className="h-full p-2 px-4">
            <div className="flex items-center justify-between my-1">
              <h3
                className="font-sans text-xl font-bold"
                style={{ color: color }}
              >
                {title}
              </h3>
              <span>{createdAt}</span>
            </div>
            <div className="my-1">
              <p className="font-sans text-sm font-normal">{description}</p>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};
export default DrawerComponent;
