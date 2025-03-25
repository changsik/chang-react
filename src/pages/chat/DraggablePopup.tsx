import Draggable from 'react-draggable';

const DraggablePopup = () => {
    return (
      <Draggable>
        <div style={popupStyle}>
          <h2>Draggable Popup</h2>
          <p>이 팝업을 드래그할 수 있습니다!</p>
        </div>
      </Draggable>
    );
}
  
const popupStyle = {
    width: '300px',
    padding: '20px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'move'
};
  
export default DraggablePopup;