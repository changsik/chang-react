import Draggable from 'react-draggable';

function GlobalDraggablePopup() {
  return (
    <Draggable>
      <div style={popupStyle}>
        <h2>Draggable Popup</h2>
        <p>이 팝업을 드래그할 수 있습니다!!!!!!!!!</p>
      </div>
    </Draggable>
  );
}

const popupStyle: React.CSSProperties = {
  width: '300px',
  padding: '20px',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'move',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000
};

export default GlobalDraggablePopup;