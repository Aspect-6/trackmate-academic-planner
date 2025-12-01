import React from 'react';
import { useApp } from '@/app/context/AppContext';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy
} from '@dnd-kit/sortable';
import SortableClassCard from '@/pages/My Classes/components/SortableClassCard';
import EmptyClassesState from '@/pages/My Classes/components/EmptyClassesState';
import './index.css';

const Classes: React.FC = () => {
    const { classes, openModal, reorderClasses } = useApp();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = classes.findIndex((c) => c.id === active.id);
            const newIndex = classes.findIndex((c) => c.id === over.id);
            reorderClasses(arrayMove(classes, oldIndex, newIndex));
        }
    };

    return (
        <div className="space-y-6">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.length === 0 ? (
                        <EmptyClassesState onAddClass={() => openModal('add-class')} />
                    ) : (
                        <SortableContext
                            items={classes.map(c => c.id)}
                            strategy={rectSortingStrategy}
                        >
                            {classes.map((classInfo) => (
                                <SortableClassCard
                                    key={classInfo.id}
                                    classInfo={classInfo}
                                    openModal={openModal}
                                />
                            ))}
                        </SortableContext>
                    )}
                </div>
            </DndContext>
        </div>
    );
};

export default Classes;


