import React , { useEffect , useState } from 'react'
import styled from 'styled-components';
import { getActivityList , createActivity } from '../actions/actions';
import { Card , notification , Button , Select  , DatePicker , Modal , Input } from 'antd';
import AwsBackgound from '../assets/AWS/awsbackground.jpg';
import BaBackgound from '../assets/BA/informationcounter.jpg';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select ;

const { Meta } = Card ; 
const { RangePicker } = DatePicker;
const Background = styled.div `
    background-image : url(${props=>props.source});
    background-repeat : no-repeat ;
    background-size : cover ; 
    width : 100%; 
    height : 20vh ;

`
const CreateTitle = styled.h3 `
    
`

const Wrapper = styled.div `
    display : grid ;
    grid-template-columns:auto auto auto auto;
    
`
const ActivityWrapper = styled.div `
    padding : 10px
`

const CreateButtonWrapper = styled.div `
    position : fixed ;
    bottom : 20px ;
    right : 20px;
`

const Portal = () =>{
    const [ init , setInit ] = useState(false);
    const [ activityList , setActivityList ] = useState([]);
    const [ visible ,  setVisible ] = useState(false);
    
    const [ activityName , setActivityName ] = useState("");
    const [ scene , setScene ] = useState("ba"); // for modal
    const [ times , setTimes ] = useState({});

    //簡化 只用一組
   
    const [ subject , setSubject ] = useState("");
    const [ description , setDescription ] = useState("");

    const history = useHistory();

    const initAction = async() =>{
        try {
            const { list } = await getActivityList();
            setInit(true);
            setActivityList(list);
            
        }catch(e){
            notification.error({
                message : "Connection failed" ,
                description : "Unable to connect server"
            })
        }
    }


    useEffect(()=>{
        if(init == false){
            initAction();
            
        }

    }, [init])

    return (
        <Wrapper>
            {
                activityList.map((activity)=>
                    <ActivityWrapper>
                        <Card
                            hoverable
                            onClick={()=>{
                                history.push(`/activity/${activity.id}`)
                            }}
                            cover={
                                (activity.scene == "ba") ?    
                                    <Background source={BaBackgound} />
                                : 
                                    <Background source={AwsBackgound} />
                                
                            }
                        >
                            <Meta title={ activity.name } description={`type : ${activity.scene}`} />
                        </Card>
                    </ActivityWrapper>
                )
            }
            <CreateButtonWrapper>
                <Button onClick={()=>setVisible(true)} size="large" shape="circle" type="primary" icon={<PlusOutlined />}></Button>
            </CreateButtonWrapper>
            <Modal
                title="Create Activity"
                visible={visible}
                onOk={async()=>{
                    try {
                        await createActivity({
                            name : activityName ,
                            scene ,
                            meetings : [
                                { subject , description , times }
                            ]
                        });
                        setVisible(false)
                        notification.success({
                            message : "成功" ,
                            description : "建立活動成功"
                        })
                        initAction();
                    }catch(e){
                        notification.error({
                            message : "失敗"  ,
                            description : "建立活動失敗"
                        })
                    }
                }}
                onCancel={()=>{
                    setVisible(false)
                }}
            >
                <CreateTitle>活動名稱</CreateTitle>
                    <Input placeholder="活動名稱" onChange={(e)=>setActivityName(e.target.value)}></Input>
                <CreateTitle>活動模板</CreateTitle>
                <Select defaultValue="ba" style={{ width: 120 }} onChange={(value)=>{
                    setScene(value);
                }}>
                    <Option value="ba">Business Agent 模板 (1 conference meeting)</Option>
                    <Option value="aws">AWS會議 模板 (1 conference meeting)</Option>
                </Select>


                <CreateTitle>會議主題</CreateTitle>
                <Input placeholder="會議主題" value={subject} onChange={(e)=>setSubject(e.target.value)}></Input>
                <CreateTitle>會議描述</CreateTitle>
                <Input placeholder="會議描述" value={description} onChange={(e)=>setDescription(e.target.value)}></Input>
                <CreateTitle>會議時間<span style={{ color: 'red' }}>(請大於目前時間並且會議時間不得大於一天)</span></CreateTitle>
                <RangePicker 
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                    onChange={(values)=>{
                    setTimes({
                        startTime : values[0] , 
                        endTime : values[1]
                    });
                }}/>
                

            </Modal>
        </Wrapper>
    )

}
export default Portal ; 