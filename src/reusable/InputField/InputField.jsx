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
import { runes } from "runes2";
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
    isError,
    options,
    maxLength,
    mode,
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
      validateStatus={
        value.length > 0 ? (isError.length === 0 ? "" : "error") : ""
      } // 'success', 'warning', 'error', 'validating'.
      help={isError} // message
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
          mode={mode}
          placeholder={`Select a ${label}`}
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={options}
          value={value}
          name={name}
          allowClear
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={value}
          type={type}
          name={name}
          style={style}
          allowClear
          onChange={onChange}
          count={{
            show: maxLength,
            max: maxLength,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) =>
              runes(txt).slice(0, max).join(""),
          }}
        />
      )}
    </Form.Item>
  );
};

export default InputField;
