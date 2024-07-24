import useStore from "@/store";
import React from "react";

const StatusBar: React.FC = () => {
  const { frequency } = useStore();
  return (
    <div>
      {frequency && (
        <div className="flex justify-center bg-green-300 font-semibold text-green-500">
          {frequency}
        </div>
      )}
    </div>
  );
};

export default StatusBar;
