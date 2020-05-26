import React , { useEffect , useState } from 'react';
import styled , { keyframes } from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import ChatBot from './ChatBot'


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
}))
const goto = keyframes`

    
    0%{
        top:-15px;
    }
    50%{
        top:0px;
    }
    100%{
        top:-15px;
    }
    
`;
const EmbedAnimation = styled.div `
    animation-name:${goto};
    animation-duration:0.5s;
    animation-iteration-count: infinite;
    position : absolute ;
`;

const Triangle = styled.div `
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 15px 0 15px;
    border-color: #00fff2 transparent transparent transparent;
    
`;


const EmbedWrapper = styled.div `
    
    position : absolute ;
    top : ${ props=>props.top };
    left : ${ props=>props.left };
`;


const HeaderWrapper = styled.div `
    display : flex ; 
    justify-content : center ;
    align-items : center ; 
    position : relative ;
    width:100%;
`;


const Content = styled.div `
    clip-path: polygon( ${props=>props.path} ) ;
    -webkit-clip-path: polygon ( ${props=>props.path} );
    background-color : transparent;
    cursor:pointer ;
    width : ${ props=>props.width };
    height : ${ props=>props.height };
    &:hover{
        opacity: 0.5;
        cursor:pointer;
    }
    &:before {
        content: "";
        display: block;
        position: relative;
        background-color: transparent;
        clip-path: polygon( ${props=>props.path});
    }
`;

const ModalStyle = styled.div `
    display : flex ;
    justify-content : center;
    align-items : center ;
    
`


const Embed = (props) =>{
    const [ visible , setVisible ] = useState(false);
    const classes = useStyles();
    function handleOnClick (){
        const { type , source } = props ; 
        
        if(type == "link"){
           return window.open(source , "_blank");
        }
        if(type == "video" || type == "youtube" || type == "chatbot" || type == "component"){
            
            return setVisible(true);
        }
        if(type == "mailto"){
            const { 
                emailTo ,
                emailCC ,
                emailSub ,
                emailBody
            } = source ;
            return window.location.href = "mailto:"+emailTo+'?cc='+emailCC+'&subject='+emailSub+'&body='+emailBody;
        }
        
        

    }

    useEffect(()=>{
       
    }, [ visible ])

    return (
        <EmbedWrapper 
            
            top={props.top}
            left={props.left}
        >
            <HeaderWrapper>
                <EmbedAnimation>
                    <Triangle />
                </EmbedAnimation>
            </HeaderWrapper>
            <Content 
                path={props.path}
                width={props.width} 
                height={props.height}
                onClick={()=>{
                
                handleOnClick()
            }}
            >
                { props.children }
            </Content>
           
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={visible}
                onClose={()=>{
                   
                    setVisible(false);
                }}
                style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >    
                <ModalStyle>
                    {
                        ( props.type == "video" ) && (
                            <video width="700" controls autoplay="autoplay">
                                <source src={props.source} type="video/mp4"/>
                            </video>
                        )
                    }
                    {
                        ( props.type == "youtube" ) && (
                            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${props.source}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                        )
                    }
                    {
                        ( props.type == "chatbot" ) && (
                            
                            <ChatBot avatar={props.source} />
                               
                        )
                    }
                    {
                        ( props.type == "component" ) && (
                            props.source
                        )
                    }
                </ModalStyle>
            </Modal>
            
        </EmbedWrapper>
    )
}

export default Embed ;