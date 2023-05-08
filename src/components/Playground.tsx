import DragNdDrop from '../playground/DragNdDrop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { StoreProvider } from '../playground/storeContext';

import './Home.scss';
import DebouncedList from '../playground/DebouncedList';

function Playground() {
  return (
    <div className="playground">
      {/* <StoreProvider>
        <DndProvider backend={HTML5Backend}>
          <DragNdDrop />
        </DndProvider>
      </StoreProvider> */}
      <DebouncedList />
    </div>
  );
}

export default Playground;
