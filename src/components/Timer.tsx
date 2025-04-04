type Props = {
  TimeLeftInMilliseconds: number;
  initialTimeLimitInMilliseconds: number;
};

export const Timer = ({
  TimeLeftInMilliseconds,
  initialTimeLimitInMilliseconds,
}: Props) => {
  const progress =
    (TimeLeftInMilliseconds / initialTimeLimitInMilliseconds) * 100;

  const widthStyle = { width: `${progress}%` };

  return (
    <div>
      <div className="bg-gray-500 rounded">
        <div className="h-2 bg-amber-400 rounded" style={widthStyle}></div>
      </div>
    </div>
  );
};
