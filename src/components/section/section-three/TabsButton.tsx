import { Button } from "@/components/ui/button";
import { GRADES } from "./btn-card.date";
import { IGrade } from "@/types/section-three.types";

interface TabsButtonProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function TabsButton({ selectedId, onSelect }: TabsButtonProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-10 justify-center">
      {GRADES.map((grade: IGrade) => (
        <Button
          key={grade.id}
          variant={selectedId === grade.id ? "default" : "outline"}
          className="min-w-[200px] 2xl:min-w-[180px] xl:min-w-[150px] sm:min-w-[165px] lg:min-w-[195px] md:min-w-[150px]"
          onClick={() => onSelect(grade.id)}
        >
          {grade.title}
        </Button>
      ))}
    </div>
  );
}
