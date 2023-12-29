import React from "react";
import {useImmer} from "use-immer";
import {streamData} from "../../utils/request.ts";


const UseImmer: React.FC<{}> = props => {
    const [chatList, setChatList] = useImmer<{ content: string; id: any }[]>([
        {
            id: 0,
            content: 'hello'
        }
    ])

    const handleData = () => {
        const obj = {
            id: 1,
            content: ''
        }
        streamData((str) => {

            setChatList(draft => {
                let target = draft.find(item => item.id == obj.id);
                console.log(JSON.stringify(target))
                if (target) {
                    target.content += str
                } else {
                    draft.push(obj)
                }
            })
        })
    }

    return (
        <>
            <button onClick={handleData}>click</button>
            <div>
                {
                    chatList.map((value, index
                    ) => <div key={index}>{value.content}</div>)
                }
            </div>

        </>
    );
};

export default UseImmer