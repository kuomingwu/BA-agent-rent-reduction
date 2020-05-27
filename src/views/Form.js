import React , { useState , useEffect } from 'react';
import styled from 'styled-components';
import { Input , Upload , message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
require('dotenv').config()

const { REACT_APP_API_DOMAIN } = process.env ; 


const Banner = styled.div `
    background-image : url(${props=>props.image});
    background-repeat : no-repeat ;
    background-size : cover;
    background-position : center ;
    width :100% ;
    height : 25vh ;
    border-radius : 10px; 
    margin-bottom : 10px;
    
`

const BkWrapper = styled.div `
    background-color : rgb(200, 203, 207) ;
    width : 100vw ; 
    min-height : 100vh ;
    padding : 10px;
`

const Wrapper = styled.div `
    width : 60vw ;
    margin : auto ;
`

const QuestionWrapper = styled.div `
    width :100% ;
    height : 25vh ;
    margin-bottom : 10px;
    display : flex ; 
    justify-content : center ;
    align-items : center ;
    background-color : white ; 
    border-radius : 10px;
    
`

const QuestionContent = styled.div `
    display : flex ;
    align-items : baseline ; 
    justify-content : flex-start ;
    flex-direction : row ; 
    background-image : white ; 

`

const QuestionTitle = styled.h3 `
    margin : 5px ;
`

const QuestionHighLightTitle = styled.h1 `
    margin : 5px ;
`

const Form = ({ banner }) =>{
    const [ loading , setLoading ] = useState(false);
    const [ imageUrl , setImageUrl ] = useState(null);
    const [ fileName , setFileName ] = useState("");
    const [ firstName , setFirstName ] = useState("");
    const [ lastName , setLastName ] = useState("");
    const [ email , setEmail ] = useState("");

    
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            
            const res = info.file.response  ;
            getBase64(info.file.originFileObj, (imageUrl)=>{
                setFileName(res.fileName);
                setImageUrl(imageUrl) ;
                setLoading(false);
            })
            
        }
    };

    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }


    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
      );

    return (
        <BkWrapper>
            <Wrapper>
                <Banner image={banner} />

                <QuestionWrapper>
                    <QuestionContent>
                        <QuestionHighLightTitle>歡迎註冊BA商務中心演講活動</QuestionHighLightTitle>            
                    </QuestionContent>
                </QuestionWrapper>

                <QuestionWrapper>
                    <QuestionContent>
                        <QuestionTitle>FirstName</QuestionTitle>
                        <Input value={firstName} onChange={(e)=>{
                            setFirstName(e.target.value);
                        }} />
                    </QuestionContent> 
                </QuestionWrapper>


                <QuestionWrapper>
                    <QuestionContent>
                        <QuestionTitle>LastName</QuestionTitle>
                        <Input value={lastName} onChange={(e)=>{
                            setLastName(e.target.value);
                        }} />
                    </QuestionContent>  
                </QuestionWrapper>


                <QuestionWrapper>
                    <QuestionContent>
                        <QuestionTitle>Email</QuestionTitle>
                        <Input value={email} onChange={(e)=>{
                            setEmail(e.target.value);
                        }} />
                    </QuestionContent>
                </QuestionWrapper>

                <QuestionWrapper>
                    <QuestionContent>
                        <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={`${REACT_APP_API_DOMAIN}/api/upload/photo`}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>

                    </QuestionContent>
                </QuestionWrapper>


            </Wrapper>
        </BkWrapper>
    )

}

export default Form ; 