'use client';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-[1001]">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-emerald-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
