// AddModal.jsx
import { useEffect } from 'react';
import { Modal, Form, Input} from 'antd';
import CloseIcon from '../SharedComponents/CloseIcon';
import CancelButton from '../SharedComponents/CancelButton';
import AddButton from '../SharedComponents/AddButton';

export default function AddModal({
  open,
  onCancel,
  onAdd,
  fieldLabel = 'Label',
  fieldName = 'fieldName',
  placeholder = 'Enter value',
  initialValue = '', // ✅ 
  isEdit = false // ✅ 
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ [fieldName]: initialValue || '' });
    }
  }, [open, fieldName, initialValue, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onAdd(values[fieldName]);
      form.resetFields();
    });
  };

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      width={540}
      style={{ borderRadius: 8 }}
      bodyStyle={{ padding: 24 }}
    >
      <div className="flex justify-between items-center mb-4 w-full">
        <h2 className="text-[20px] font-[Inter] font-semibold mx-auto">
          {isEdit ? 'Edit' : 'Add New'}
        </h2>
        <CloseIcon onClick={onCancel}></CloseIcon>
      </div>


      <Form form={form} layout="vertical">
        <Form.Item
          label={fieldLabel}
          name={fieldName}
          // rules={[{ required: true, message: `Please enter ${fieldLabel.toLowerCase()}` }]}
        >
          <Input placeholder={placeholder}
            style={{
              fontSize: '16px',
              color: '#333333',
              fontFamily: 'Inter',
              padding: '10px 16px',
              borderColor: '#767676',
              borderRadius: '6px',
            }}
          />
        </Form.Item>

        <div className="flex justify-between mt-6 ">

          <CancelButton onClick={onCancel} text={'Cancel'}></CancelButton>
          <AddButton onClick={handleSubmit} text={isEdit ? 'Update' : 'Add'}></AddButton>

        </div>
      </Form>
    </Modal>
  );
}
