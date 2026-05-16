import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TrainingModal = ({ open, onClose }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [training, setTraining] = useState(false);

  if (!open) return null;

  const startTraining = () => {
    if (!file) {
      alert("Please upload training dataset");
      return;
    }

    setTraining(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTraining(false);
          alert("Training completed successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          Model Training
        </h2>

        <input
          type="file"
          accept=".zip,.csv"
          className="mb-4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {training && (
          <div className="mb-4">
            <div className="h-3 bg-gray-200 rounded">
              <div
                className="h-3 bg-indigo-600 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2 text-center">
              Training... {progress}%
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
            disabled={training}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded"
            onClick={startTraining}
            disabled={training}
          >
            Start Training
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingModal;
