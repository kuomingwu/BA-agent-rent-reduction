import React ,{ useState } from 'react';
import Lobby from './Lobby';
import Street from './Street';
import Banner from '../../assets/BA/informationcounter.jpg';
import Room from './Room';
export {
    Lobby , 
    Banner ,
    Scene
}


//可切換的場警
const Scene = ({ activity }) =>{
    //lobby is default scene 0   
    const SceneList = [ Lobby , Street , Room ] ; 
    const [ currentScene , setCurrentScene ] = useState(0);

    const Com = SceneList[currentScene] ;
    return (
        <Com activity={activity} onChangeScene={(sceneIndex)=>{
            setCurrentScene(sceneIndex);
        }}>
            
        </Com>

    )

}