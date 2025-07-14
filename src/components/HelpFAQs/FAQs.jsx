import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import AddFAQModal from './AddFAQModal';
import Container from '../SharedComponents/Container';

const faqs = [
    {
        id: 1,
        question: 'Are all your products authentic?',
        answer: 'Yes — we guarantee that every product we sell is 100% authentic. All sealed Pokémon items come directly from trusted distributors, and our sports singles and jerseys are carefully sourced.'
    },
    {
        id: 2,
        question: 'How do I know what condition my card or product is in?',
        answer: 'We clearly describe the condition of every item in the product details — whether it’s brand new, factory-sealed, or lightly handled. If you ever want extra photos or info, just reach out to us before you order!'
    },
    {
        id: 3,
        question: 'What payment methods do you accept?',
        answer: 'We accept all major debit and credit cards, PayPal, and [any local options, like bKash]. All payments are processed securely — we never store your card information.'
    },
    {
        id: 4,
        question: 'How long does shipping take?',
        answer: 'Orders are usually processed within 1–2 business days. Shipping times vary by location, but you\'ll always get a tracking number to follow your order from our door to yours.'
    }
];

export default function FAQs() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () =>{
        setIsModalVisible(true);
    };
    const handleCancel =() => {
        setIsModalVisible(false);
    }
    return (
        <>
            <Container>
                <div className="rounded-[8px] bg-white shadow-lg p-12 ">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Link to="/"><img src="/public/images/users/Frame.png" alt="" /></Link>
                        <h2 className="text-[20px] font-[Inter] font-semibold">FAQs</h2>
                    </div>


                </div>


                {/* FAQ Grid */}
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-20 gap-y-10 px-10 py-8">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="relative pr-8">
                            <span className="text-[14px] text-black font-medium font-[Inter]">Question no: {faq.id}</span>
                            <div className='flex justify-between'>
                                <h3 className="mt-1 text-[16px] font-semibold text-black font-[Inter]">{faq.question}</h3>
                                <Button style={{ border: 'none', boxShadow: 'none' }}
                                    className="p-0"><img className='w-[24px] h-[24px]' src="/public/images/delete-yellow.png" alt="delete" /></Button>
                            </div>
                            <p className="mt-2 text-[#333333] text-[15px] leading-[28px] font-[Inter]">{faq.answer}</p>
                            {/* <DeleteOutlined className="absolute top-0 right-0 text-[#E4AF00] cursor-pointer" /> */}

                        </div>
                    ))}
                </div>


                {/* Button End */}
                <div className="flex justify-center mt-32">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                        style={{
                            backgroundColor: '#E4AF00',
                            border: 'none',
                            color: '#FEFEFE',
                            borderRadius: 4,
                            height: '48px',
                            padding: '0 44px',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 16,
                        }}
                    >
                        Add FAQ
                    </Button>

                    {/* Show Modal */}
                    <AddFAQModal open={isModalVisible} onCancel={handleCancel} />

                </div>

            </div>
            </Container>
        </>
    )
}
