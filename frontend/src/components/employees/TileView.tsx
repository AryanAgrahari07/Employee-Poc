import React from "react";
import EmployeeCard from "./EmployeeCard";

export default function TileView({ edges, onCardClick, user, onEdit, onDelete }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {edges.map((e: any) => (
        <EmployeeCard 
          key={e.node.id} 
          node={e.node} 
          onClick={() => onCardClick(e.node.id)} 
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
