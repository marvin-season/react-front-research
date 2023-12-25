import React, {useState} from "react";
import PDFViewer from "../../components/pdf";
import styled from "styled-components";

const ItemCard = styled.div<{
    activate: boolean
}>`
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid ${({activate}) => activate ? 'blue' : '#aaa'};
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const PDFViewPageContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;

`
const items = [
    {
        id: 1,
        pageNumber: 1,
        keyword: "nascetur ridiculus mus. Pellentesque eget semper ligula, et luctus odio. Nam ac metus nec ex euismod varius acaligula.Curabiturvelscelerisqueodi",
    },
    {
        id: 2,
        pageNumber: 2,
        keyword: 'arcu est, sit amet aliquet'
    }
]

export const PDFViewPage: React.FC<{}> = props => {
    const [currentItem, setCurrentItem] = useState(items[0])
    return (
        <PDFViewPageContainer>
            <div>
                <PDFViewer keyword={currentItem.keyword} pageNumber={currentItem.pageNumber}/>
            </div>
            <div>
                {
                    items.map(item =>
                        <ItemCard onClick={() => setCurrentItem(item)}
                                  activate={currentItem.id == item.id}>
                            <span>{item.pageNumber}</span>
                            <span>{item.keyword}</span>
                        </ItemCard>)
                }
            </div>

        </PDFViewPageContainer>
    );
};