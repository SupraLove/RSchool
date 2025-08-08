import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export const FaqItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: FaqItemProps) => {
  return (
    <div
      className="border-b border-gray-300 py-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{question}</h3>
        {isOpen ? (
          <ChevronUpIcon className="w-6 h-6 text-primary" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-primary" />
        )}
      </div>
      <div
        className={`mt-2 text-gray-700 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};
