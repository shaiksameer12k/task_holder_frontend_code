import React from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Upload,
} from "antd";

import FileUpload from "../FileUpload/FileUpload";

const { RangePicker } = DatePicker;
const InputField = ({ formItemProps, onChange, onSearch }) => {
  const {
    label,
    name,
    value,
    type,
    placeholder,
    isMandatory,
    style,
    wrapperCol,
    layout,
    hasFeedback,
    validateStatus,
    help,
    options,
  } = formItemProps;

  return (
    <Form.Item
      label={label} // Dynamic label for the form item
      name={name} // Unique identifier for the form item
      required={isMandatory} // Whether the field is required
      style={style} // Custom styling for the form item
      wrapperCol={wrapperCol} // Layout configuration for content of the form itemsss
      layout={layout} // virtecal horizontal
      hasFeedback={hasFeedback} // true , false
      validateStatus={validateStatus} // 'success', 'warning', 'error', 'validating'.
      help={help} // message
    >
      {type == "checkbox" ? (
        <Checkbox name={name} onChange={onChange} checked={value}>
          {label}
        </Checkbox>
      ) : type == "radio" ? (
        <Radio name={name} onChange={onChange} checked={value}>
          {label}
        </Radio>
      ) : type == "date" ? (
        <DatePicker name={name} onChange={onChange} />
      ) : type == "dateTime" ? (
        <RangePicker name={name} onChange={onChange} />
      ) : type == "file" ? (
        <FileUpload />
      ) : type == "select" ? (
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={options}
          value={value}
          name={name}
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={value}
          type={type}
          style={style}
          allowClear
          onChange={onChange}
        />
      )}
    </Form.Item>
  );
};

export default InputField;
