import { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const DraggableResizablePopup = () => {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);

    return (
        <Draggable cancel=".react-resizable-handle">
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[200, 100]}
        maxConstraints={[600, 400]}
        onResize={(e, data) => {
          setWidth(data.size.width);
          setHeight(data.size.height);
        }}
        style={popupStyle}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <h2>Draggable and Resizable Popup</h2>
          <p>이 팝업을 드래그하고 크기를 조절할 수 있습니다!</p>
        </div>
      </ResizableBox>
    </Draggable>
    );
}
  
const popupStyle = {
    padding: '20px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'move'
  };
  
export default DraggableResizablePopup;