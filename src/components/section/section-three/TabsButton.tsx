import { Button } from "@/components/ui/button";
import { GRADES } from "./btn-card.date";
import { IGrade } from "@/types/section-three.types";

interface TabsButtonProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function TabsButton({ selectedId, onSelect }: TabsButtonProps) {
  return (
    <div className="flex gap-4 mb-10 justify-between mx-50">
      {GRADES.map((grade: IGrade) => (
        <Button
          key={grade.id}
          variant={selectedId === grade.id ? "default" : "outline"}
          className="w-[200px]"
          onClick={() => onSelect(grade.id)}
        >
          {grade.title}
        </Button>
      ))}
    </div>
  );
}
