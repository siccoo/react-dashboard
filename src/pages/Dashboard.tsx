/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { connectSocket, subscribeToData } from '../utils/socketService';
import { addWidget, reorderWidgets } from '../services/dashboardSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FixedSizeList as List } from 'react-window';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const widgets = useSelector((state: RootState) => state.dashboard.widgets);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const socket = connectSocket();
    subscribeToData((incomingData) => setData(incomingData));
  
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedWidgets = Array.from(widgets);
    const [movedWidget] = reorderedWidgets.splice(result.source.index, 1);
    reorderedWidgets.splice(result.destination.index, 0, movedWidget);
    dispatch(reorderWidgets(reorderedWidgets));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Real-Time Dashboard</h1>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => dispatch(addWidget(`Widget-${widgets.length + 1}`))}
      >
        Add Widget
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard" direction="vertical">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <List
                height={400}
                itemCount={widgets.length}
                itemSize={50}
                width={300}
              >
                {({ index, style }) => (
                  <Draggable key={widgets[index]} draggableId={widgets[index]} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 border rounded shadow-md bg-gray-100"
                        style={style}
                      >
                        {widgets[index]} - {JSON.stringify(data)}
                      </div>
                    )}
                  </Draggable>
                )}
              </List>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
