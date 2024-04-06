import { axiosInstanceV1 } from "@/utils/axios";
import { Button, Form, type FormProps, Input } from "antd";
import urls from "@/utils/routes";

type FieldType = {
  title?: string;
  body?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  axiosInstanceV1.post(urls.posts, { data: values });
};

export const AddNewForm = () => (
  <Form onFinish={onFinish} autoComplete="off">
    <Form.Item<FieldType>
      label="Title"
      name="title"
      rules={[{ required: true, message: "Please input your title!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Body"
      name="body"
      rules={[{ required: true, message: "Please input your body!" }]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
