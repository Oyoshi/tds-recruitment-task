interface LoadingIndicatorProps {
  label: string;
}

export function LoadingIndicator({ label }: LoadingIndicatorProps) {
  return (
    <div className="mb-8 flex justify-center items-center opacity-50 animate-puls">
      <p>{label}</p>
    </div>
  );
}
